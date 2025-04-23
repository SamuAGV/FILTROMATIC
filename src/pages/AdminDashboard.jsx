"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  User,
  ListChecks,
  Database,
  LogOut,
  Power,
  AlertTriangle,
  Users,
  Activity,
  Settings,
  BarChart,
  Link,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import Logo from "../assets/LogoFM.jpeg"
import ControlServoMotor from "./ControlServoMotor"
import MetricsSystem from "../components/MetricsSystem"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [nombreAdministrador, setNombreAdministrador] = useState("")
  const [systemSummary, setSystemSummary] = useState({
    totalSensores: 0,
    totalRegistros: 0,
  })
  const [isSystemOn, setIsSystemOn] = useState(false)
  const [sensorData, setSensorData] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("/dashboard")
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalClientes, setTotalClientes] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login")
    } else {
      fetch("https://api.filtromatic.xdn.com.mx/api/registros")
        .then((response) => response.json())
        .then((data) => {
          const administrador = data.find((user) => user.id_rol === 1)
          if (administrador) {
            setNombreAdministrador(administrador.nombre)
          } else {
            setNombreAdministrador("Administrador")
          }
        })
        .catch((error) => {
          console.error("Error al obtener los datos del administrador:", error)
          setNombreAdministrador("Administrador")
        })

      fetchSystemSummary()
      fetchSensorData()

      const interval = setInterval(() => {
        fetchSystemSummary()
        fetchSensorData()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [navigate])

  const fetchSystemSummary = async () => {
    try {
      const response = await fetch("https://api.filtromatic.xdn.com.mx/api/metricas")
      if (!response.ok) throw new Error("Error al obtener métricas")
      const data = await response.json()
      setSystemSummary(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchSensorData = async () => {
    try {
      const response = await fetch("https://api.filtromatic.xdn.com.mx/api/registross")
      if (!response.ok) throw new Error("Error al obtener datos de sensores")
      const data = await response.json()

      const formattedData = data.map((registro) => ({
        time: `${registro.fecha} ${registro.hora}`,
        value: registro.id_,
      }))

      setSensorData(formattedData)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("https://api.filtromatic.xdn.com.mx/api/clientes")
        if (!response.ok) throw new Error("Error al obtener la cantidad de clientes")
        const data = await response.json()
        setTotalClientes(data.length)
      } catch (error) {
        console.error("Error al obtener los clientes:", error)
      }
    }

    fetchClientes()
  }, [])

  const handleCerrarSesion = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleSystemToggle = () => {
    setIsSystemOn(!isSystemOn)
  }

  const handleEmergency = () => {
    alert("¡Emergencia activada!")
  }

  const crudItems = [
    { name: "Clientes", icon: User, description: "Gestionar a los clientes", route: "/clientes" },
    { name: "Usuarios", icon: Users, description: "Gestión de usuarios", route: "/usuarios" },
    { name: "Registros", icon: Database, description: "Historial de datos registrados", route: "/registros" },
    { name: "Banda", icon: Activity, description: "Control de la banda transportadora", route: "/banda" },
    { name: "Controles", icon: Settings, description: "Configuración de controles", route: "/controles" },
    { name: "Sensores", icon: BarChart, description: "Datos de sensores", route: "/sensores" },
    { name: "Relaciones", icon: Link, description: "Relaciones entre elementos", route: "/relaciones" },
  ]

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNavigation = (route) => {
    setActiveItem(route)
    navigate(route)
    if (windowWidth <= 768) {
      setIsMobileMenuOpen(false)
    }
  }

  const isSmallMobile = windowWidth <= 480

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertTriangle size={48} />
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
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
        
        /* Loading and Error Styles */
        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          color: #f8fafc;
          gap: 20px;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(56, 189, 248, 0.3);
          border-radius: 50%;
          border-top-color: #38bdf8;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .error-container svg {
          color: #f87171;
        }
        
        /* Dashboard Container */
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          color: #f8fafc;
          display: flex;
          flex-direction: column;
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
          pointer-events: none;
        }
        
        /* Header */
        .dashboard-header {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          padding: 0 20px;
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(56, 189, 248, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .mobile-menu-button {
          display: none;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .mobile-menu-button:hover {
          background: rgba(15, 23, 42, 0.9);
          border-color: rgba(56, 189, 248, 0.4);
        }
        
        @media (max-width: 768px) {
          .mobile-menu-button {
            display: flex;
          }
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
          object-fit: cover;
        }
        
        .logo-text {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }
        
        @media (max-width: 480px) {
          .logo-text {
            display: none;
          }
        }
        
        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .welcome-text {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #f8fafc;
        }
        
        @media (max-width: 768px) {
          .user-info {
            display: none;
          }
        }
        
        .logout-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
        }
        
        .logout-button:hover {
          background: rgba(239, 68, 68, 0.3);
          transform: translateY(-2px);
        }
        
        .logout-text {
          display: block;
        }
        
        @media (max-width: 480px) {
          .logout-button {
            padding: 8px;
            border-radius: 8px;
          }
          
          .logout-text {
            display: none;
          }
        }
        
        /* Dashboard Content */
        .dashboard-content {
          display: flex;
          flex: 1;
          position: relative;
          z-index: 1;
        }
        
        /* Sidebar */
        .sidebar {
          width: 260px;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(56, 189, 248, 0.1);
          height: calc(100vh - 70px);
          position: sticky;
          top: 70px;
          overflow-y: auto;
          transition: all 0.3s ease;
          z-index: 50;
          scrollbar-width: thin;
          scrollbar-color: rgba(56, 189, 248, 0.3) rgba(15, 23, 42, 0.5);
        }
        
        .sidebar::-webkit-scrollbar {
          width: 6px;
        }
        
        .sidebar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        
        .sidebar::-webkit-scrollbar-thumb {
          background-color: rgba(56, 189, 248, 0.3);
          border-radius: 6px;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 70px;
            left: 0;
            transform: translateX(-100%);
            box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
            z-index: 100;
          }
          
          .sidebar.open {
            transform: translateX(0);
          }
        }
        
        .sidebar-header {
          padding: 20px;
          border-bottom: 1px solid rgba(56, 189, 248, 0.1);
        }
        
        .sidebar-title {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #38bdf8;
          margin: 0;
        }
        
        .sidebar-menu {
          padding: 16px 0;
        }
        
        .sidebar-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
          position: relative;
          overflow: hidden;
        }
        
        .sidebar-item:hover {
          background: rgba(56, 189, 248, 0.1);
          color: #f8fafc;
        }
        
        .sidebar-item.active {
          background: rgba(56, 189, 248, 0.15);
          border-left: 3px solid #38bdf8;
          color: #f8fafc;
        }
        
        .sidebar-item.active::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.1), transparent);
          z-index: -1;
        }
        
        .sidebar-icon {
          margin-right: 12px;
          width: 20px;
          height: 20px;
          color: inherit;
        }
        
        .sidebar-text {
          font-size: 14px;
          font-weight: 500;
        }
        
        /* Main Content */
        .main-content {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          position: relative;
          z-index: 1;
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .main-content {
            padding: 12px;
          }
        }
        
        /* Page Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        
        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
          position: relative;
          padding-bottom: 8px;
        }
        
        .page-title::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          border-radius: 3px;
        }
        
        @media (max-width: 768px) {
          .page-title {
            font-size: 24px;
          }
        }
        
        @media (max-width: 480px) {
          .page-title {
            font-size: 20px;
          }
        }
        
        .control-buttons {
          display: flex;
          gap: 12px;
        }
        
        @media (max-width: 640px) {
          .control-buttons {
            width: 100%;
            justify-content: space-between;
          }
        }
        
        .control-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
          border: none;
        }
        
        .system-on-button {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
        }
        
        .system-on-button:hover {
          background: rgba(16, 185, 129, 0.3);
          transform: translateY(-2px);
        }
        
        .system-off-button {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
        }
        
        .system-off-button:hover {
          background: rgba(239, 68, 68, 0.3);
          transform: translateY(-2px);
        }
        
        .emergency-button {
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #fbbf24;
        }
        
        .emergency-button:hover {
          background: rgba(245, 158, 11, 0.3);
          transform: translateY(-2px);
        }
        
        @media (max-width: 480px) {
          .control-button {
            padding: 8px;
            border-radius: 8px;
          }
          
          .control-button span {
            display: none;
          }
        }
        
        /* Sections */
        .dashboard-section {
          margin-bottom: 24px;
        }
        
        @media (max-width: 480px) {
          .dashboard-section {
            margin-bottom: 16px;
          }
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .section-title::before {
          content: "";
          display: block;
          width: 4px;
          height: 18px;
          background: linear-gradient(to bottom, #38bdf8, #818cf8);
          border-radius: 2px;
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 16px;
            margin-bottom: 12px;
          }
        }
        
        /* Chart Section */
        .chart-section {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .chart-section::before {
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
        
        @media (max-width: 768px) {
          .chart-section {
            padding: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .chart-section {
            padding: 12px;
          }
        }
        
        .chart-container {
          margin-top: 16px;
          background: rgba(15, 23, 42, 0.4);
          border-radius: 8px;
          padding: 16px;
          border: 1px solid rgba(56, 189, 248, 0.05);
        }
        
        @media (max-width: 480px) {
          .chart-container {
            margin-top: 12px;
            padding: 8px;
          }
        }
        
        /* CRUD Grid */
        .crud-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .crud-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .crud-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
        
        /* CRUD Card */
        .crud-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .crud-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, transparent 100%);
          z-index: -1;
        }
        
        .crud-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border-color: rgba(56, 189, 248, 0.3);
        }
        
        @media (max-width: 768px) {
          .crud-card {
            padding: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .crud-card {
            padding: 12px;
          }
        }
        
        .crud-icon-container {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
          transition: all 0.3s;
        }
        
        .crud-card:hover .crud-icon-container {
          background: rgba(56, 189, 248, 0.15);
          border-color: rgba(56, 189, 248, 0.4);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
        }
        
        @media (max-width: 480px) {
          .crud-icon-container {
            width: 40px;
            height: 40px;
            margin-right: 12px;
          }
        }
        
        .crud-icon {
          color: #38bdf8;
          transition: all 0.3s;
        }
        
        .crud-card:hover .crud-icon {
          transform: scale(1.1);
        }
        
        .crud-content {
          flex: 1;
        }
        
        .crud-title {
          font-size: 16px;
          font-weight: 600;
          color: #f8fafc;
          margin: 0 0 4px 0;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .crud-description {
          font-size: 14px;
          color: #94a3b8;
          margin: 0;
        }
        
        @media (max-width: 480px) {
          .crud-title {
            font-size: 14px;
          }
          
          .crud-description {
            font-size: 12px;
          }
        }
        
        /* Overlay 
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 90;
        }*/
        
        /* Metrics Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .metrics-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
        
        /* Metric Card */
        .metric-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          padding: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }
        
        .metric-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, transparent 100%);
          z-index: -1;
        }
        
        .metric-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border-color: rgba(56, 189, 248, 0.3);
        }
        
        @media (max-width: 768px) {
          .metric-card {
            padding: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .metric-card {
            padding: 12px;
          }
        }
        
        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .metric-icon-container {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
        }
        
        @media (max-width: 480px) {
          .metric-icon-container {
            width: 40px;
            height: 40px;
          }
        }
        
        .metric-icon {
          color: #38bdf8;
        }
        
        .metric-change {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          color: #10b981;
          font-weight: 600;
        }
        
        .metric-title {
          font-size: 14px;
          font-weight: 500;
          color: #94a3b8;
          margin: 0 0 8px 0;
        }
        
        .metric-value {
          font-size: 32px;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        @media (max-width: 480px) {
          .metric-value {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="grid-background"></div>

      <header className="dashboard-header">
        <div className="header-left">
          <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="logo-container">
            <img src={Logo || "/placeholder.svg"} alt="Logo FiltroMatic" className="logo" />
            <span className="logo-text">FiltroMatic</span>
          </div>
        </div>

        <div className="header-right">
          <div className="user-info">
            <span className="welcome-text">Bienvenido</span>
            <span className="user-name">{nombreAdministrador}</span>
          </div>

          <button className="logout-button" onClick={handleCerrarSesion}>
            <LogOut size={18} />
            <span className="logout-text">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <h2 className="sidebar-title">Panel de Control</h2>
          </div>

          <div className="sidebar-menu">
            {crudItems.map((item) => (
              <div
                key={item.name}
                className={`sidebar-item ${activeItem === item.route ? "active" : ""}`}
                onClick={() => handleNavigation(item.route)}
              >
                <item.icon className="sidebar-icon" size={20} />
                <span className="sidebar-text">{item.name}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">Panel de Control</h1>

            <div className="control-buttons">
              <button
                className={`control-button ${isSystemOn ? "system-on-button" : "system-off-button"}`}
                onClick={handleSystemToggle}
              >
                <Power size={18} />
                <span>{isSystemOn ? "Apagar Sistema" : "Encender Sistema"}</span>
              </button>

              <button className="control-button emergency-button" onClick={handleEmergency}>
                <AlertTriangle size={18} />
                <span>Emergencia</span>
              </button>
            </div>
          </div>

          <section className="dashboard-section">
            <MetricsSystem metrics={systemSummary} advancedStats={{ totalClientes }} />
          </section>

          <section className="dashboard-section">
            <div className="chart-section">
              <h2 className="section-title">Datos de Sensores en Tiempo Real</h2>

              <div className="chart-container">
                <ResponsiveContainer width="100%" height={isSmallMobile ? 200 : 300}>
                  <LineChart
                    data={sensorData}
                    margin={{
                      top: 5,
                      right: isSmallMobile ? 10 : 30,
                      left: isSmallMobile ? 0 : 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.1)" />
                    <XAxis
                      dataKey="time"
                      stroke="#94a3b8"
                      tick={{ fontSize: isSmallMobile ? 10 : 12 }}
                      tickLine={{ stroke: "#94a3b8" }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      tick={{ fontSize: isSmallMobile ? 10 : 12 }}
                      tickLine={{ stroke: "#94a3b8" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(56, 189, 248, 0.2)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                        color: "#f8fafc",
                        fontSize: isSmallMobile ? 10 : 12,
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: isSmallMobile ? 10 : 12,
                        color: "#94a3b8",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#38bdf8"
                      strokeWidth={2}
                      dot={{ fill: "#38bdf8", r: 4, strokeWidth: 0 }}
                      activeDot={{
                        r: isSmallMobile ? 6 : 8,
                        fill: "#38bdf8",
                        stroke: "rgba(56, 189, 248, 0.3)",
                        strokeWidth: 3,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="dashboard-section">
            <h2 className="section-title">Gestión de Filtromatic</h2>

            <div className="crud-grid">
              {crudItems.map((item) => (
                <div key={item.name} className="crud-card" onClick={() => navigate(item.route)}>
                  <div className="crud-icon-container">
                    <item.icon className="crud-icon" size={isSmallMobile ? 18 : 24} />
                  </div>

                  <div className="crud-content">
                    <h3 className="crud-title">
                      {item.name}
                      <ChevronRight size={16} />
                    </h3>
                    <p className="crud-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="chart-section">
              <h2 className="section-title">Control de Banda Transportadora</h2>
              <ControlServoMotor />
            </div>
          </section>
          
        </main>
      </div>

      {isMobileMenuOpen && <div className="overlay" onClick={() => setIsMobileMenuOpen(false)} />}
    </div>
  )
}

const CrudCard = ({ item, navigate, isSmallMobile }) => (
  <div className="crud-card" onClick={() => navigate(item.route)}>
    <div className="crud-icon-container">
      <item.icon className="crud-icon" size={isSmallMobile ? 18 : 24} />
    </div>

    <div className="crud-content">
      <h3 className="crud-title">
        {item.name}
        <ChevronRight size={16} />
      </h3>
      <p className="crud-description">{item.description}</p>
    </div>
  </div>
)

export default AdminDashboard

