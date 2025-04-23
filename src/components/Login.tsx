"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const API_BASE_URL = "https://api.filtromatic.xdn.com.mx/api"

const Login = () => {
  const [user, setUser] = useState({ correo: "", contraseña: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (isBlocked && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)

      return () => clearInterval(timer)
    } else if (timeLeft === 0 && isBlocked) {
      setIsBlocked(false)
      setAttempts(0)
    }
  }, [isBlocked, timeLeft])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isBlocked) return

    try {
      const { data } = await axios.post(`${API_BASE_URL}/login`, user)
      localStorage.setItem("token", data.token)

      alert("Inicio de sesión exitoso")
      if (data.id_rol === 1) {
        navigate("/admin")
      } else {
        navigate("/user")
      }
    } catch (error) {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      if (newAttempts >= 3) {
        setIsBlocked(true)
        setTimeLeft(30)
        alert("Formulario bloqueado. Demasiados intentos fallidos.")
      } else {
        alert(`Credenciales incorrectas. Intentos restantes: ${3 - newAttempts}`)
      }
      console.error("Error en el login:", error)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-container">
      <style>
        {`
        /* Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #f8fafc;
        }
        
        /* Login Container */
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          position: relative;
          overflow: hidden;
        }
        
        /* Grid Background */
        .grid-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(30, 41, 59, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 41, 59, 0.5) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.2;
          z-index: 0;
        }
        
        /* Tech Circles */
        .tech-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(14, 165, 233, 0.3);
          opacity: 0.5;
          z-index: 0;
        }
        
        .tech-circle-1 {
          top: 20%;
          right: 10%;
          width: 200px;
          height: 200px;
          animation: rotate 30s linear infinite;
        }
        
        .tech-circle-2 {
          bottom: 30%;
          left: 5%;
          width: 300px;
          height: 300px;
          animation: rotate 40s linear infinite reverse;
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Login Box */
        .login-box {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(14, 165, 233, 0.1);
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
          border: 1px solid rgba(14, 165, 233, 0.1);
          overflow: hidden;
        }
        
        .login-box::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, transparent 100%),
            radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.1) 0%, transparent 50%);
          z-index: -1;
        }
        
        /* Logo */
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          position: relative;
        }
        
        .logo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid rgba(14, 165, 233, 0.3);
          box-shadow: 
            0 0 20px rgba(14, 165, 233, 0.5),
            0 0 40px rgba(14, 165, 233, 0.2);
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          z-index: 2;
          background-color: #0f172a;
          padding: 3px;
        }
        
        .logo:hover {
          transform: scale(1.05);
          box-shadow: 
            0 0 30px rgba(14, 165, 233, 0.6),
            0 0 50px rgba(14, 165, 233, 0.3);
        }
        
        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%);
          z-index: 1;
          animation: pulse 4s infinite;
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        }
        
        /* Title */
        .login-title {
          text-align: center;
          color: #f8fafc;
          margin-bottom: 1.5rem;
          font-size: 2rem;
          font-weight: 700;
          position: relative;
          display: inline-block;
          width: 100%;
        }
        
        .login-title::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
          border-radius: 3px;
        }
        
        /* Timer Message */
        .timer-message {
          text-align: center;
          color: #f87171;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          padding: 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .timer-message svg {
          animation: pulse-red 1.5s infinite;
        }
        
        @keyframes pulse-red {
          0% { opacity: 0.7; }
          50% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
        
        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        /* Input Group */
        .input-group {
          position: relative;
        }
        
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          transition: all 0.3s;
        }
        
        .login-input {
          width: 100%;
          padding: 0.9rem 0.9rem 0.9rem 2.5rem;
          border-radius: 8px;
          border: 1px solid rgba(14, 165, 233, 0.2);
          background: rgba(15, 23, 42, 0.8);
          color: #f8fafc;
          font-size: 1rem;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .login-input:focus {
          outline: none;
          border-color: rgba(14, 165, 233, 0.5);
          box-shadow: 
            0 0 0 2px rgba(14, 165, 233, 0.1),
            0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .login-input:focus + .input-icon {
          color: #38bdf8;
        }
        
        .login-input::placeholder {
          color: #64748b;
        }
        
        .login-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Password Container */
        .password-container {
          position: relative;
        }
        
        .toggle-password-button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
        }
        
        .toggle-password-button:hover {
          color: #38bdf8;
        }
        
        .toggle-password-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Buttons */
        .button {
          padding: 0.9rem;
          border-radius: 8px;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .login-button {
          background: linear-gradient(135deg, #0ea5e9, #2563eb);
          color: #f8fafc;
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(14, 165, 233, 0.3),
            0 0 20px rgba(14, 165, 233, 0.2);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .login-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.6s;
          z-index: -1;
        }
        
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 15px 25px -5px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(14, 165, 233, 0.4),
            0 0 30px rgba(14, 165, 233, 0.3);
        }
        
        .login-button:hover::before {
          left: 100%;
        }
        
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .register-button {
          background: rgba(15, 23, 42, 0.8);
          color: #38bdf8;
          border: 1px solid rgba(14, 165, 233, 0.3);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
        }
        
        .register-button:hover {
          background: rgba(15, 23, 42, 0.9);
          border-color: rgba(14, 165, 233, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }
        
        /* Back Button */
        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(14, 165, 233, 0.2);
          color: #38bdf8;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          z-index: 10;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
          background: rgba(15, 23, 42, 0.9);
        }

        /* Animation Styles */
        @keyframes floatIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .shimmer-effect {
          background: linear-gradient(90deg, 
            rgba(14, 165, 233, 0), 
            rgba(14, 165, 233, 0.2), 
            rgba(14, 165, 233, 0));
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        `}
      </style>

      <motion.div
        className="grid-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      ></motion.div>

      <motion.div
        className="tech-circle tech-circle-1"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      ></motion.div>

      <motion.div
        className="tech-circle tech-circle-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      ></motion.div>

      <motion.div
        className="back-button"
        onClick={() => navigate("/")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.1, boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} />
      </motion.div>

      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
      >
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="logo-glow"></div>
          <motion.img
            src="../LogoFM.jpeg"
            alt="Logo FiltroMatic"
            className="logo"
            onClick={() => navigate("/")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(14, 165, 233, 0.6), 0 0 50px rgba(14, 165, 233, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>

        <motion.h2
          className="login-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Acceso al Sistema
        </motion.h2>

        <AnimatePresence>
          {isBlocked && (
            <motion.div
              className="timer-message"
              initial={{ opacity: 0, height: 0, margin: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: "1.5rem" }}
              exit={{ opacity: 0, height: 0, margin: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Lock size={16} />
              Formulario bloqueado. Intenta nuevamente en {timeLeft} segundos.
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit}
          className="login-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="input-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              onChange={handleChange}
              required
              className="login-input"
              disabled={isBlocked}
              whileFocus={{ boxShadow: "0 0 0 2px rgba(14, 165, 233, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)" }}
            />
            <Mail className="input-icon" size={18} />
          </motion.div>

          <motion.div
            className="input-group password-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.input
              type={showPassword ? "text" : "password"}
              name="contraseña"
              placeholder="Contraseña"
              onChange={handleChange}
              required
              className="login-input"
              disabled={isBlocked}
              whileFocus={{ boxShadow: "0 0 0 2px rgba(14, 165, 233, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)" }}
            />
            <Lock className="input-icon" size={18} />
            <motion.button
              type="button"
              onClick={toggleShowPassword}
              className="toggle-password-button"
              disabled={isBlocked}
              whileHover={{ scale: 1.1, color: "#38bdf8" }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </motion.button>
          </motion.div>

          <motion.button
            type="submit"
            className="button login-button"
            disabled={isBlocked}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{
              y: -5,
              boxShadow:
                "0 15px 25px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(14, 165, 233, 0.4), 0 0 30px rgba(14, 165, 233, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Iniciar sesión
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate("/register")}
            className="button register-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            Crear una cuenta
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate("/")}
            className="button register-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            Volver al inicio
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Login

