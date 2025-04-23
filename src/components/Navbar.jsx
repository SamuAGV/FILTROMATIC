"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  LogIn,
  LogOut,
  ChevronDown,
  Users,
  Settings,
  User,
  Building,
  FileText,
  Activity,
  Sliders,
  Cpu,
  LinkIcon,
  Menu,
  X,
} from "lucide-react"
import LogoFM from "../assets/LogoFM.jpeg"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [adminMenuOpen, setAdminMenuOpen] = useState(false)
  const [systemMenuOpen, setSystemMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setAdminMenuOpen(false)
        setSystemMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const handleCerrarSesion = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleAdminMenu = (e) => {
    e.stopPropagation()
    setAdminMenuOpen(!adminMenuOpen)
    setSystemMenuOpen(false)
  }

  const toggleSystemMenu = (e) => {
    e.stopPropagation()
    setSystemMenuOpen(!systemMenuOpen)
    setAdminMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="navbar-container">
      <style jsx>{`
        /* Base Styles */
        .navbar-container {
          position: relative;
          font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          z-index: 50;
        }
        
        /* Navbar */
        .navbar {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(56, 189, 248, 0.1);
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        
        /* Logo */
        .logo-container {
          display: flex;
          align-items: center;
        }
        
        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #f8fafc;
        }
        
        .logo-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
        }
        
        .logo-text {
          margin-left: 12px;
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        /* Navigation */
        .nav-list {
          display: flex;
          list-style: none;
          gap: 8px;
          margin: 0;
          padding: 0;
        }
        
        .nav-item {
          position: relative;
        }
        
        .nav-link {
          color: #f8fafc;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .nav-link:hover {
          background: rgba(56, 189, 248, 0.1);
        }
        
        .nav-link.active {
          background: rgba(56, 189, 248, 0.15);
          border-bottom: 2px solid #38bdf8;
        }
        
        .nav-icon {
          width: 16px;
          height: 16px;
        }
        
        /* Dropdown */
        .dropdown-button {
          color: #f8fafc;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          user-select: none;
        }
        
        .dropdown-button:hover {
          background: rgba(56, 189, 248, 0.1);
        }
        
        .dropdown-button.active {
          background: rgba(56, 189, 248, 0.15);
          border-bottom: 2px solid #38bdf8;
        }
        
        .dropdown-arrow {
          transition: transform 0.3s;
        }
        
        .dropdown-arrow.open {
          transform: rotate(180deg);
        }
        
        .dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          min-width: 220px;
          z-index: 100;
          overflow: hidden;
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .dropdown-link {
          color: #f8fafc;
          text-decoration: none;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
          font-size: 14px;
          border-left: 3px solid transparent;
        }
        
        .dropdown-link:hover {
          background: rgba(56, 189, 248, 0.1);
        }
        
        .dropdown-link.active {
          background: rgba(56, 189, 248, 0.15);
          border-left: 3px solid #38bdf8;
        }
        
        .dropdown-icon {
          width: 16px;
          height: 16px;
        }
        
        /* Logout Button */
        .logout-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
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
        
        /* Mobile Menu */
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
          
          .nav-list, .logout-button {
            display: none;
          }
        }
        
        .mobile-menu {
          display: flex;
          flex-direction: column;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          position: absolute;
          top: 70px;
          left: 0;
          right: 0;
          z-index: 40;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          max-height: calc(100vh - 70px);
          overflow-y: auto;
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .mobile-header {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid rgba(56, 189, 248, 0.1);
          background: rgba(15, 23, 42, 0.8);
        }
        
        .mobile-header-logo {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(56, 189, 248, 0.2);
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
        }
        
        .mobile-header-title {
          margin-left: 12px;
          font-size: 16px;
          font-weight: 600;
          color: #f8fafc;
        }
        
        .mobile-section {
          padding: 8px 0;
          border-bottom: 1px solid rgba(56, 189, 248, 0.05);
        }
        
        .mobile-section-title {
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #38bdf8;
          letter-spacing: 1px;
        }
        
        .mobile-link {
          color: #f8fafc;
          text-decoration: none;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background-color 0.2s;
          font-size: 14px;
          border-left: 3px solid transparent;
        }
        
        .mobile-link:hover {
          background: rgba(56, 189, 248, 0.1);
        }
        
        .mobile-link.active {
          background: rgba(56, 189, 248, 0.15);
          border-left: 3px solid #38bdf8;
        }
        
        .mobile-icon {
          width: 18px;
          height: 18px;
        }
        
        .mobile-logout-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 16px;
          margin: 16px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
        }
        
        .mobile-logout-button:hover {
          background: rgba(239, 68, 68, 0.3);
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
          z-index: 30;
        }
      `}</style>

      <style>
        {`
          body {
            font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #f8fafc;
            background-color: #0f172a;
          }
        `}
      </style>

      <nav className="navbar">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/admin" className="logo-link">
            <img src={LogoFM || "/placeholder.svg"} alt="Logo FiltroMatic" className="logo-image" />
            <span className="logo-text">FiltroMatic</span>
          </Link>
        </div>

        {/* Menú de navegación - Escritorio */}
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/login" className={`nav-link ${isActive("/login") ? "active" : ""}`}>
              <LogIn className="nav-icon" />
              <span>Login</span>
            </Link>
          </li>

          {/* Menú desplegable - Admin */}
          <li className="nav-item dropdown-container">
            <div className={`dropdown-button ${adminMenuOpen ? "active" : ""}`} onClick={toggleAdminMenu}>
              <Users className="nav-icon" />
              <span>Admin</span>
              <ChevronDown className={`dropdown-arrow ${adminMenuOpen ? "open" : ""}`} size={14} />
            </div>
            {adminMenuOpen && (
              <div className="dropdown">
                <Link to="/admin" className={`dropdown-link ${isActive("/admin") ? "active" : ""}`}>
                  <Settings className="dropdown-icon" />
                  <span>Panel Admin</span>
                </Link>
                <Link to="/user" className={`dropdown-link ${isActive("/user") ? "active" : ""}`}>
                  <User className="dropdown-icon" />
                  <span>Panel Usuario</span>
                </Link>
                <Link to="/clientes" className={`dropdown-link ${isActive("/clientes") ? "active" : ""}`}>
                  <Building className="dropdown-icon" />
                  <span>Clientes</span>
                </Link>
                <Link to="/usuarios" className={`dropdown-link ${isActive("/usuarios") ? "active" : ""}`}>
                  <Users className="dropdown-icon" />
                  <span>Usuarios</span>
                </Link>
              </div>
            )}
          </li>

          {/* Menú desplegable - Sistema */}
          <li className="nav-item dropdown-container">
            <div className={`dropdown-button ${systemMenuOpen ? "active" : ""}`} onClick={toggleSystemMenu}>
              <Settings className="nav-icon" />
              <span>Sistema</span>
              <ChevronDown className={`dropdown-arrow ${systemMenuOpen ? "open" : ""}`} size={14} />
            </div>
            {systemMenuOpen && (
              <div className="dropdown">
                <Link to="/registros" className={`dropdown-link ${isActive("/registros") ? "active" : ""}`}>
                  <FileText className="dropdown-icon" />
                  <span>Registros</span>
                </Link>
                <Link to="/banda" className={`dropdown-link ${isActive("/banda") ? "active" : ""}`}>
                  <Activity className="dropdown-icon" />
                  <span>Banda</span>
                </Link>
                <Link to="/controles" className={`dropdown-link ${isActive("/controles") ? "active" : ""}`}>
                  <Sliders className="dropdown-icon" />
                  <span>Controles</span>
                </Link>
                <Link to="/sensores" className={`dropdown-link ${isActive("/sensores") ? "active" : ""}`}>
                  <Cpu className="dropdown-icon" />
                  <span>Sensores</span>
                </Link>
                <Link to="/relaciones" className={`dropdown-link ${isActive("/relaciones") ? "active" : ""}`}>
                  <LinkIcon className="dropdown-icon" />
                  <span>Relaciones</span>
                </Link>
              </div>
            )}
          </li>
        </ul>

        {/* Botón de cerrar sesión */}
        <button onClick={handleCerrarSesion} className="logout-button">
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>

        {/* Botón de menú móvil */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {isOpen && isMobile && (
        <>
          <div className="overlay" onClick={() => setIsOpen(false)}></div>
          <div className="mobile-menu">
            <div className="mobile-header">
              <img src={LogoFM || "/placeholder.svg"} alt="Logo FiltroMatic" className="mobile-header-logo" />
              <div className="mobile-header-title">Menú de Navegación</div>
            </div>

            <div className="mobile-section">
              <div className="mobile-section-title">Principal</div>
              <Link to="/login" className={`mobile-link ${isActive("/login") ? "active" : ""}`}>
                <LogIn className="mobile-icon" />
                <span>Login</span>
              </Link>
            </div>

            <div className="mobile-section">
              <div className="mobile-section-title">Administración</div>
              <Link to="/admin" className={`mobile-link ${isActive("/admin") ? "active" : ""}`}>
                <Settings className="mobile-icon" />
                <span>Panel Admin</span>
              </Link>
              <Link to="/user" className={`mobile-link ${isActive("/user") ? "active" : ""}`}>
                <User className="mobile-icon" />
                <span>Panel Usuario</span>
              </Link>
              <Link to="/clientes" className={`mobile-link ${isActive("/clientes") ? "active" : ""}`}>
                <Building className="mobile-icon" />
                <span>Clientes</span>
              </Link>
              <Link to="/usuarios" className={`mobile-link ${isActive("/usuarios") ? "active" : ""}`}>
                <Users className="mobile-icon" />
                <span>Usuarios</span>
              </Link>
            </div>

            <div className="mobile-section">
              <div className="mobile-section-title">Sistema</div>
              <Link to="/registros" className={`mobile-link ${isActive("/registros") ? "active" : ""}`}>
                <FileText className="mobile-icon" />
                <span>Registros</span>
              </Link>
              <Link to="/banda" className={`mobile-link ${isActive("/banda") ? "active" : ""}`}>
                <Activity className="mobile-icon" />
                <span>Banda</span>
              </Link>
              <Link to="/controles" className={`mobile-link ${isActive("/controles") ? "active" : ""}`}>
                <Sliders className="mobile-icon" />
                <span>Controles</span>
              </Link>
              <Link to="/sensores" className={`mobile-link ${isActive("/sensores") ? "active" : ""}`}>
                <Cpu className="mobile-icon" />
                <span>Sensores</span>
              </Link>
              <Link to="/relaciones" className={`mobile-link ${isActive("/relaciones") ? "active" : ""}`}>
                <LinkIcon className="mobile-icon" />
                <span>Relaciones</span>
              </Link>
            </div>

            <button onClick={handleCerrarSesion} className="mobile-logout-button">
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar

