"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Github, Linkedin, Mail, Globe, ArrowLeft } from 'lucide-react'
import { motion } from "framer-motion"

const Developers = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.body.classList.toggle("mobile-menu-open")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  const developers = [
    {
      name: "Samuel Antonio Garduño Viviana",
      role: "Desarrollador Full Stack",
      bio: "Especialista en desarrollo de sistemas de automatización y procesamiento de datos en tiempo real. Responsable de la arquitectura del sistema y la integración de sensores.",
      skills: ["React", "Node.js", "Express", "Sistemas Embebidos", "Automatización"],
      image: "/placeholder.svg?height=300&width=300",
      social: {
        github: "#",
        linkedin: "#",
        email: "samuel@filtromatic.com",
        website: "#",
      },
    },
    {
      name: "Jose Luis Guadarrama Hernandez",
      role: "Ingeniero de Hardware",
      bio: "Experto en diseño de circuitos y sistemas de control para bandas transportadoras. Desarrolló el hardware de detección de color y los mecanismos de clasificación automática.",
      skills: ["Electrónica", "Arduino", "Sensores", "PCB Design", "Microcontroladores"],
      image: "/placeholder.svg?height=300&width=300",
      social: {
        github: "#",
        linkedin: "#",
        email: "joseluis@filtromatic.com",
        website: "#",
      },
    },
    {
      name: "Brenda Jhedai Gonzalez Montes",
      role: "Desarrolladora Frontend & UX",
      bio: "Especialista en interfaces de usuario y experiencia de usuario. Diseñó los dashboards interactivos y los sistemas de visualización de datos para el monitoreo en tiempo real.",
      skills: ["UI/UX", "React", "Data Visualization", "Diseño de Interfaces", "Accesibilidad"],
      image: "/placeholder.svg?height=300&width=300",
      social: {
        github: "#",
        linkedin: "#",
        email: "brenda@filtromatic.com",
        website: "#",
      },
    },
  ]

  return (
    <div className="developers-page">
      <style jsx>{`
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
          background-color: #0f172a;
        }
        
        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          height: 70px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(56, 189, 248, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          cursor: pointer;
        }

        .navbar-logo-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
        }

        .navbar-logo-text {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .navbar-links {
          display: flex;
          gap: 8px;
        }

        .navbar-link {
          color: #f8fafc;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s;
          font-size: 14px;
          font-weight: 500;
        }

        .navbar-link:hover {
          background: rgba(56, 189, 248, 0.1);
        }

        .navbar-link.active {
          background: rgba(56, 189, 248, 0.15);
          border-bottom: 2px solid #38bdf8;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
        }

        .navbar-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(56, 189, 248, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
        }

        .navbar-button:hover {
          background: rgba(56, 189, 248, 0.3);
          transform: translateY(-2px);
        }

        .navbar-mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
        }

        .toggle-bar {
          width: 24px;
          height: 2px;
          background-color: #f8fafc;
          transition: all 0.3s;
        }

        .navbar-mobile-menu {
          display: none;
          flex-direction: column;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          padding: 16px;
          border-bottom: 1px solid rgba(56, 189, 248, 0.1);
        }

        .mobile-link {
          color: #f8fafc;
          text-decoration: none;
          padding: 12px 16px;
          border-radius: 8px;
          transition: all 0.3s;
          font-size: 14px;
          font-weight: 500;
        }

        .mobile-link:hover {
          background: rgba(56, 189, 248, 0.1);
        }

        .mobile-link.active {
          background: rgba(56, 189, 248, 0.15);
          border-left: 3px solid #38bdf8;
        }

        .mobile-button {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(56, 189, 248, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
        }

        .mobile-button:hover {
          background: rgba(56, 189, 248, 0.3);
        }

        @media (max-width: 768px) {
          .navbar-links, .navbar-actions {
            display: none;
          }
          
          .navbar-mobile-toggle {
            display: flex;
          }
          
          body.mobile-menu-open .navbar-mobile-menu {
            display: flex;
          }
          
          body.mobile-menu-open .toggle-bar:nth-child(1) {
            transform: translateY(6px) rotate(45deg);
          }
          
          body.mobile-menu-open .toggle-bar:nth-child(2) {
            opacity: 0;
          }
          
          body.mobile-menu-open .toggle-bar:nth-child(3) {
            transform: translateY(-6px) rotate(-45deg);
          }
        }
        
        /* Main Container */
        .developers-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          position: relative;
          overflow: hidden;
        }
        
        .developers-page::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 25%),
            radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.1) 0%, transparent 30%);
          pointer-events: none;
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
        
        /* Header Section */
        .header-section {
          padding-top: 120px;
          padding-bottom: 60px;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        
        .header-title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 16px;
          color: #f8fafc;
          text-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        
        .header-subtitle {
          font-size: 20px;
          color: #94a3b8;
          max-width: 768px;
          margin: 0 auto 48px auto;
          line-height: 1.6;
        }
        
        .text-blue {
          color: #38bdf8;
          position: relative;
          display: inline-block;
        }
        
        .text-blue::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #38bdf8, transparent);
        }
        
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 40px;
        }
        
        .back-button:hover {
          background: rgba(56, 189, 248, 0.1);
          transform: translateY(-2px);
        }
        
        /* Team Section */
        .team-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 16px 80px;
          position: relative;
          z-index: 1;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 40px;
        }
        
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Developer Card */
        .developer-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .developer-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, transparent 100%),
            radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.1) 0%, transparent 50%);
          z-index: -1;
        }
        
        .developer-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
          border-color: rgba(56, 189, 248, 0.3);
        }
        
        .developer-image-container {
          position: relative;
          height: 300px;
          overflow: hidden;
        }
        
        .developer-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s;
        }
        
        .developer-card:hover .developer-image {
          transform: scale(1.05);
        }
        
        .developer-image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(to top, rgba(15, 23, 42, 1), transparent);
        }
        
        .developer-content {
          padding: 24px;
        }
        
        .developer-name {
          font-size: 24px;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 8px;
        }
        
        .developer-role {
          font-size: 16px;
          color: #38bdf8;
          margin-bottom: 16px;
          font-weight: 500;
        }
        
        .developer-bio {
          color: #94a3b8;
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .developer-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        
        .skill-tag {
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .developer-social {
          display: flex;
          gap: 12px;
        }
        
        .social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          transition: all 0.3s;
        }
        
        .social-link:hover {
          background: rgba(56, 189, 248, 0.2);
          transform: translateY(-3px);
        }
        
        /* Footer */
        .footer {
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 1));
          backdrop-filter: blur(10px);
          color: #f8fafc;
          padding: 40px 16px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(14, 165, 233, 0.1);
          text-align: center;
        }
        
        .footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 10% 0%, rgba(14, 165, 233, 0.1) 0%, transparent 30%),
            radial-gradient(circle at 90% 100%, rgba(5, 150, 105, 0.1) 0%, transparent 30%);
          z-index: 0;
        }
        
        .footer-text {
          font-size: 14px;
          color: #94a3b8;
          position: relative;
          z-index: 1;
        }
        
        /* Tech Elements */
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
      `}</style>

      {/* Navbar */}
      <motion.div 
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="navbar-container">
          <motion.div 
            className="navbar-logo" 
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img 
              src="../LogoFM.jpeg" 
              alt="Logo FiltroMatic" 
              className="navbar-logo-image"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.span 
              className="navbar-logo-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              FiltroMatic
            </motion.span>
          </motion.div>
          <div className="navbar-links">
            <motion.a 
              href="/" 
              className="navbar-link"
              whileHover={{ y: -2, backgroundColor: "rgba(56, 189, 248, 0.1)" }}
              whileTap={{ y: 0 }}
            >
              Inicio
            </motion.a>
            <motion.a 
              href="#" 
              className="navbar-link active"
              whileHover={{ y: -2, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
              whileTap={{ y: 0 }}
            >
              Equipo
            </motion.a>
          </div>
          <div className="navbar-actions">
            <motion.button 
              onClick={() => navigate("/login")} 
              className="navbar-button"
              whileHover={{ y: -3, backgroundColor: "rgba(56, 189, 248, 0.3)" }}
              whileTap={{ y: 0, scale: 0.95 }}
            >
              Acceder
            </motion.button>
          </div>
          <motion.div 
            className="navbar-mobile-toggle" 
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
          >
            <div className="toggle-bar"></div>
            <div className="toggle-bar"></div>
            <div className="toggle-bar"></div>
          </motion.div>
        </div>
        <motion.div 
          className="navbar-mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
            display: isMobileMenuOpen ? "flex" : "none"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.a 
            href="/" 
            className="mobile-link"
            whileHover={{ x: 5, backgroundColor: "rgba(56, 189, 248, 0.1)" }}
          >
            Inicio
          </motion.a>
          <motion.a 
            href="#" 
            className="mobile-link active"
            whileHover={{ x: 5, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
          >
            Equipo
          </motion.a>
          <motion.button 
            onClick={() => navigate("/login")} 
            className="mobile-button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Acceder
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
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

      {/* Header Section */}
      <div className="header-section">
        <motion.button 
          onClick={() => navigate("/")} 
          className="back-button"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ x: -5, backgroundColor: "rgba(56, 189, 248, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </motion.button>
        
        <motion.h1 
          className="header-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Nuestro <span className="text-blue">Equipo</span>
        </motion.h1>
        
        <motion.p 
          className="header-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Conozca a los talentosos profesionales detrás de FiltroMatic, combinando experiencia en ingeniería, desarrollo
          de software y diseño para crear soluciones innovadoras en la gestión de residuos.
        </motion.p>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <motion.div 
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {developers.map((developer, index) => (
            <motion.div 
              key={index} 
              className="developer-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 25px 35px rgba(0, 0, 0, 0.3)",
                borderColor: "rgba(56, 189, 248, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="developer-image-container">
                <motion.img 
                  src={developer.image || "/placeholder.svg"} 
                  alt={developer.name} 
                  className="developer-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="developer-image-overlay"></div>
              </div>
              <motion.div 
                className="developer-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <h2 className="developer-name">{developer.name}</h2>
                <p className="developer-role">{developer.role}</p>
                <p className="developer-bio">{developer.bio}</p>
                <div className="developer-skills">
                  {developer.skills.map((skill, skillIndex) => (
                    <motion.span 
                      key={skillIndex} 
                      className="skill-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + skillIndex * 0.05, duration: 0.3 }}
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: "rgba(56, 189, 248, 0.2)",
                        borderColor: "rgba(56, 189, 248, 0.4)"
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                <div className="developer-social">
                  <motion.a 
                    href={developer.social.github} 
                    className="social-link" 
                    title="GitHub"
                    whileHover={{ y: -5, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={18} />
                  </motion.a>
                  <motion.a 
                    href={developer.social.linkedin} 
                    className="social-link" 
                    title="LinkedIn"
                    whileHover={{ y: -5, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a 
                    href={`mailto:${developer.social.email}`} 
                    className="social-link" 
                    title="Email"
                    whileHover={{ y: -5, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail size={18} />
                  </motion.a>
                  <motion.a 
                    href={developer.social.website} 
                    className="social-link" 
                    title="Website"
                    whileHover={{ y: -5, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Globe size={18} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.p 
          className="footer-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          © {new Date().getFullYear()} FiltroMatic. Todos los derechos reservados.
        </motion.p>
      </motion.footer>
    </div>
  )
}

export default Developers
