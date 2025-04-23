"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Pie, Bar } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"
import { LogOut, AlertTriangle, BarChart, Database, Activity, Settings, Zap, Filter, Menu, X } from "lucide-react"
import ControlServoMotor from "./ControlServoMotor"
import MetricsSystem from "./MetricsSystem"
import Logo from "../assets/LogoFM.jpeg"
import RecentActivity from "../components/RecentActivity"

Chart.register(...registerables)

const API_BASE_URL = "https://api.filtromatic.xdn.com.mx/api/"

const fetchMetrics = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/metricas`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) throw new Error("Error al obtener métricas")
    return await response.json()
  } catch (error) {
    console.error("Error fetching metrics:", error)
    throw error
  }
}

const fetchRecentRecords = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ultimos-registros`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) throw new Error("Error al obtener registros recientes")
    return await response.json()
  } catch (error) {
    console.error("Error fetching recent records:", error)
    throw error
  }
}

const UserDashboard = () => {
  const navigate = useNavigate()
  const [nombreUsuario, setNombreUsuario] = useState("Operador")
  const [metrics, setMetrics] = useState(null)
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [advancedStats, setAdvancedStats] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }

        const [metricsData, activitiesData, statsData, chartData] = await Promise.all([
          fetchMetrics(token),
          fetchRecentRecords(token),
          fetchAdvancedStats(token),
          fetchChartData(token),
        ])

        setMetrics(metricsData)
        setRecentActivities(activitiesData)
        setAdvancedStats(statsData)
        setChartData(chartData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [navigate])

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

  const fetchAdvancedStats = async (token) => {
    const response = await fetch(`${API_BASE_URL}/estadisticas-avanzadas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Error al obtener estadísticas avanzadas")
    return await response.json()
  }

  const fetchChartData = async (token) => {
    const response = await fetch(`${API_BASE_URL}/datos-graficos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error("Error al obtener datos para gráficos")
    return await response.json()
  }

  const handleDateFilter = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `${API_BASE_URL}/registros-por-fecha?fechaInicio=${dateRange.start}&fechaFin=${dateRange.end}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      const data = await response.json()
      setRecentActivities(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCerrarSesion = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES")
  }

  const getStatusIcon = (tipo) => {
    if (tipo === "success") return <div className="activity-icon success">✓</div>
    if (tipo === "warning") return <div className="activity-icon warning">⚠️</div>
    if (tipo === "error") return <div className="activity-icon error">✗</div>
    return null
  }

  const getStatusClass = (tipo) => {
    if (tipo === "success") return "success"
    if (tipo === "warning") return "warning"
    if (tipo === "error") return "error"
    return ""
  }

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
        
        .current-date {
          font-size: 14px;
          color: #94a3b8;
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
          margin-bottom: 24px;
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
        
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        
        @media (max-width: 992px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .chart-container {
          background: rgba(15, 23, 42, 0.4);
          border-radius: 8px;
          padding: 16px;
          border: 1px solid rgba(56, 189, 248, 0.05);
        }
        
        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .chart-title {
          font-size: 16px;
          font-weight: 600;
          color: #f8fafc;
          margin: 0;
        }
        
        .chart-legend {
          display: flex;
          gap: 16px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #94a3b8;
        }
        
        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }
        
        .chart-wrapper {
          height: 250px;
          position: relative;
        }
        
        @media (max-width: 480px) {
          .chart-wrapper {
            height: 200px;
          }
        }
        
        /* Activity Section */
        .activity-section {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .activity-section::before {
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
        
        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        @media (max-width: 768px) {
          .activity-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
        
        .date-filter {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        @media (max-width: 480px) {
          .date-filter {
            flex-wrap: wrap;
          }
        }
        
        .date-input {
          padding: 8px 12px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 6px;
          color: #f8fafc;
          font-size: 14px;
        }
        
        .date-input:focus {
          outline: none;
          border-color: rgba(56, 189, 248, 0.5);
        }
        
        .filter-button {
          padding: 8px 16px;
          background: rgba(56, 189, 248, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
        }
        
        .filter-button:hover {
          background: rgba(56, 189, 248, 0.3);
          transform: translateY(-2px);
        }
        
        .activity-list {
          max-height: 400px;
          overflow-y: auto;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: rgba(56, 189, 248, 0.3) rgba(15, 23, 42, 0.5);
        }
        
        .activity-list::-webkit-scrollbar {
          width: 6px;
        }
        
        .activity-list::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 6px;
        }
        
        .activity-list::-webkit-scrollbar-thumb {
          background-color: rgba(56, 189, 248, 0.3);
          border-radius: 6px;
        }
        
        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 8px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .activity-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.05), transparent);
          z-index: -1;
        }
        
        .activity-item:hover {
          transform: translateX(5px);
        }
        
        .activity-item.success {
          background: rgba(16, 185, 129, 0.1);
          border-left: 3px solid #10b981;
        }
        
        .activity-item.warning {
          background: rgba(245, 158, 11, 0.1);
          border-left: 3px solid #f59e0b;
        }
        
        .activity-item.error {
          background: rgba(239, 68, 68, 0.1);
          border-left: 3px solid #ef4444;
        }
        
        .activity-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .activity-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }
        
        .activity-icon.success {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .activity-icon.warning {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }
        
        .activity-icon.error {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .activity-text {
          font-size: 14px;
          color: #f8fafc;
        }
        
        .activity-time {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .no-activities {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
          color: #94a3b8;
        }
        
        .no-activities-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }
        
        /* Status Section */
        .status-section {
          margin-bottom: 24px;
        }
        
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .status-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }
        
        @media (max-width: 480px) {
          .status-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
        }
        
        .status-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .status-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, transparent 100%);
          z-index: -1;
        }
        
        .status-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border-color: rgba(56, 189, 248, 0.3);
        }
        
        .status-icon-container {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }
        
        .status-icon {
          color: #38bdf8;
        }
        
        .status-title {
          font-size: 14px;
          font-weight: 500;
          color: #94a3b8;
          margin-bottom: 8px;
        }
        
        .status-value {
          font-size: 18px;
          font-weight: 700;
          color: #f8fafc;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .status-indicator.active {
          background-color: #10b981;
        }
        
        .status-indicator.inactive {
          background-color: #ef4444;
        }
        
        /* Footer */
        .footer {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          padding: 16px 24px;
          text-align: center;
          border-top: 1px solid rgba(56, 189, 248, 0.1);
          color: #94a3b8;
          font-size: 14px;
        }
        
        /* Overlay */
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 90;
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
            <span className="user-name">{nombreUsuario}</span>
          </div>

          <button className="logout-button" onClick={handleCerrarSesion}>
            <LogOut size={18} />
            <span className="logout-text">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        

        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">Panel de Control</h1>
            <div className="current-date">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <section className="dashboard-section">
            <MetricsSystem metrics={metrics} advancedStats={advancedStats} />
          </section>

          <section className="chart-section">
            <h2 className="section-title">Control de Banda Transportadora</h2>
            <ControlServoMotor />
          </section>

          <div className="charts-grid">
            <div className="chart-container">
              <div className="chart-header">
                <h3 className="chart-title">Estado de Bandas</h3>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: "#4CAF50" }}></div>
                    <span>Activas</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: "#F44336" }}></div>
                    <span>Inactivas</span>
                  </div>
                </div>
              </div>
              <div className="chart-wrapper">
                {chartData && (
                  <Pie
                    data={{
                      labels: ["Activas", "Inactivas"],
                      datasets: [
                        {
                          data: [chartData.bandasActivas, chartData.bandasInactivas],
                          backgroundColor: ["#4CAF50", "#F44336"],
                          borderColor: ["#388E3C", "#D32F2F"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-header">
                <h3 className="chart-title">Distribución de Sensores</h3>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: "#FF5252" }}></div>
                    <span>Sensores Rojo</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: "#4FC3F7" }}></div>
                    <span>Sensores Verde/Azul</span>
                  </div>
                </div>
              </div>
              <div className="chart-wrapper">
                {chartData && (
                  <Bar
                    data={{
                      labels: ["Sensores Rojo", "Sensores Verde/Azul"],
                      datasets: [
                        {
                          label: "Cantidad",
                          data: [chartData.sensoresRojo, chartData.sensoresVerdeAzul],
                          backgroundColor: ["#FF5252", "#4FC3F7"],
                          borderColor: ["#D32F2F", "#0288D1"],
                          borderWidth: 1,
                          borderRadius: 6,
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            display: true,
                            color: "rgba(255,255,255,0.05)",
                          },
                          ticks: {
                            color: "#94a3b8",
                          },
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                          ticks: {
                            color: "#94a3b8",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="dashboard-section status-section">
            <h2 className="section-title">Estado del Sistema</h2>
            <div className="status-grid">
              <div className="status-card">
                <div className="status-icon-container">
                  <Filter className="status-icon" size={20} />
                </div>
                <h3 className="status-title">Sensor de Color</h3>
                <div className="status-value">
                  <div className={`status-indicator ${metrics?.bandasActivas > 0 ? "active" : "inactive"}`}></div>
                  {metrics?.bandasActivas > 0 ? "Operativo" : "Inactivo"}
                </div>
              </div>
              <div className="status-card">
                <div className="status-icon-container">
                  <Activity className="status-icon" size={20} />
                </div>
                <h3 className="status-title">Banda Transportadora</h3>
                <div className="status-value">
                  <div className={`status-indicator ${metrics?.bandasActivas > 0 ? "active" : "inactive"}`}></div>
                  {metrics?.bandasActivas > 0 ? "Activa" : "Inactiva"}
                </div>
              </div>
              <div className="status-card">
                <div className="status-icon-container">
                  <Settings className="status-icon" size={20} />
                </div>
                <h3 className="status-title">Mecanismo de Separación</h3>
                <div className="status-value">
                  <div
                    className={`status-indicator ${metrics?.controladoresActivos > 0 ? "active" : "inactive"}`}
                  ></div>
                  {metrics?.controladoresActivos > 0 ? "Funcionando" : "Detenido"}
                </div>
              </div>
              <div className="status-card">
                <div className="status-icon-container">
                  <Zap className="status-icon" size={20} />
                </div>
                <h3 className="status-title">Sensores Activos</h3>
                <div className="status-value">
                  <div
                    className={`status-indicator ${(advancedStats?.sensoresActivos / metrics?.totalSensores) > 0.5 ? "active" : "inactive"}`}
                  ></div>
                  {`${advancedStats?.sensoresActivos || 0}/${metrics?.totalSensores || 0}`}
                </div>
              </div>
            </div>
          </div>

          <section className="activity-section">
            <RecentActivity
              dateRange={dateRange}
              setDateRange={setDateRange}
              handleDateFilter={handleDateFilter}
              recentActivities={recentActivities}
              getStatusClass={getStatusClass}
              getStatusIcon={getStatusIcon}
              formatDate={formatDate}
            />
          </section>
        </main>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} FiltroMatic - Sistema de Monitoreo Industrial</p>
      </footer>

      {isMobileMenuOpen && <div className="overlay" onClick={() => setIsMobileMenuOpen(false)} />}
    </div>
  )
}

export default UserDashboard

