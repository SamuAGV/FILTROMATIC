"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { User, Edit, Trash2, Plus, Save, X, ChevronLeft, ChevronRight, Shield, Mail, Key, Database } from 'lucide-react'

const API_URL = "https://api.filtromatic.xdn.com.mx/api/usuarios"

const UsuariosCRUD = () => {
  const [usuarios, setUsuarios] = useState([])
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [idRol, setIdRol] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [usuariosPerPage] = useState(5)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mongoSuccess, setMongoSuccess] = useState(null)

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const fetchUsuarios = async () => {
    setLoading(true)
    try {
      const response = await axios.get(API_URL)
      setUsuarios(response.data)
      setError(null)
    } catch (error) {
      console.error("Error fetching usuarios:", error)
      setError("Error al cargar los usuarios. Intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const createUsuario = async () => {
    try {
      await axios.post(API_URL, { nombre, correo, contraseña, id_rol: idRol })
      resetForm()
      fetchUsuarios()
      setIsFormVisible(false)
    } catch (error) {
      console.error("Error creating usuario:", error)
      setError("Error al crear el usuario. Verifique los datos e intente nuevamente.")
    }
  }

  const updateUsuario = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { nombre, correo, contraseña, id_rol: idRol })
      resetForm()
      fetchUsuarios()
      setIsFormVisible(false)
    } catch (error) {
      console.error("Error updating usuario:", error)
      setError("Error al actualizar el usuario. Verifique los datos e intente nuevamente.")
    }
  }

  const deleteUsuario = async (id) => {
    if (!confirm("¿Está seguro que desea eliminar este usuario?")) return
    
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchUsuarios()
    } catch (error) {
      console.error("Error deleting usuario:", error)
      setError("Error al eliminar el usuario. Intente nuevamente.")
    }
  }

  const resetForm = () => {
    setNombre("")
    setCorreo("")
    setContraseña("")
    setIdRol("")
    setEditingId(null)
  }

  const handleEdit = (usuario) => {
    setNombre(usuario.nombre)
    setCorreo(usuario.correo)
    setContraseña("")
    setIdRol(usuario.id_rol)
    setEditingId(usuario.id_usuario)
    setIsFormVisible(true)
  }

  const handleCancel = () => {
    resetForm()
    setIsFormVisible(false)
  }

  const handleStoreInMongo = () => {
    setMongoSuccess("Usuarios almacenados en MongoDB correctamente")
    setTimeout(() => setMongoSuccess(null), 3000)
  }

  const indexOfLastUsuario = currentPage * usuariosPerPage
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage
  const currentUsuarios = usuarios.slice(indexOfFirstUsuario, indexOfLastUsuario)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const getRoleName = (rolId) => {
    switch (rolId) {
      case 1:
        return "Administrador"
      case 2:
        return "Usuario"
      default:
        return `Rol ${rolId}`
    }
  }

  return (
    <div className="usuarios-container">
      <style jsx>{`
        /* Base Styles */
        .usuarios-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          color: #f8fafc;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .title {
          font-size: 24px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
          position: relative;
          padding-bottom: 8px;
        }
        
        .title::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          border-radius: 3px;
        }
        
        .add-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(56, 189, 248, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
        }
        
        .add-button:hover {
          background: rgba(56, 189, 248, 0.3);
          transform: translateY(-2px);
        }
        
        /* Form Styles */
        .form-container {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .form-container::before {
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
        
        .form-title {
          font-size: 18px;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .form-input {
          padding: 10px 12px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 6px;
          color: #f8fafc;
          font-size: 14px;
          transition: all 0.3s;
        }
        
        .form-input:focus {
          outline: none;
          border-color: rgba(56, 189, 248, 0.5);
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.1);
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        
        .cancel-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
        }
        
        .cancel-button:hover {
          background: rgba(239, 68, 68, 0.3);
          transform: translateY(-2px);
        }
        
        .save-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
        }
        
        .save-button:hover {
          background: rgba(16, 185, 129, 0.3);
          transform: translateY(-2px);
        }
        
        /* Table Styles */
        .table-container {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        
        .table-container::before {
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
        
        .table-wrapper {
          overflow-x: auto;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px; /* Asegura que la tabla tenga un ancho mínimo */
        }
        
        .table th {
          background: rgba(15, 23, 42, 0.8);
          color: #38bdf8;
          font-weight: 600;
          text-align: left;
          padding: 16px;
          font-size: 14px;
          border-bottom: 1px solid rgba(56, 189, 248, 0.1);
        }
        
        .table td {
          padding: 12px 16px;
          border-bottom: 1px solid rgba(56, 189, 248, 0.05);
          font-size: 14px;
          color: #f8fafc;
        }
        
        .table tr:hover td {
          background: rgba(56, 189, 248, 0.05);
        }
        
        .table tr:last-child td {
          border-bottom: none;
        }
        
        .actions {
          display: flex;
          gap: 8px;
        }
        
        .edit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .edit-button:hover {
          background: rgba(245, 158, 11, 0.2);
          transform: translateY(-2px);
        }
        
        .delete-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .delete-button:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: translateY(-2px);
        }
        
        /* Pagination Styles */
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 24px;
          gap: 8px;
        }
        
        .page-button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          padding: 0 8px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.1);
          color: #94a3b8;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
        }
        
        .page-button:hover {
          background: rgba(56, 189, 248, 0.1);
          color: #f8fafc;
        }
        
        .page-button.active {
          background: rgba(56, 189, 248, 0.2);
          border-color: rgba(56, 189, 248, 0.3);
          color: #38bdf8;
        }
        
        /* Loading and Error States */
        .loading, .error {
          padding: 40px;
          text-align: center;
          color: #94a3b8;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(56, 189, 248, 0.3);
          border-radius: 50%;
          border-top-color: #38bdf8;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .role-admin {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .role-user {
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: #38bdf8;
        }
        
        .role-other {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          color: #8b5cf6;
        }
        
        .empty-state {
          padding: 40px;
          text-align: center;
          color: #94a3b8;
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        /* New styles for Mongo button and success message */
        .mongo-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: #8b5cf6;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
          font-size: 14px;
        }
        
        .mongo-button:hover {
          background: rgba(139, 92, 246, 0.3);
          transform: translateY(-2px);
        }
        
        .success-message {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      <div className="header">
        <h1 className="title">Gestión de Usuarios</h1>
        {!isFormVisible && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="add-button" onClick={() => setIsFormVisible(true)}>
              <Plus size={16} />
              Agregar Usuario
            </button>
            <button className="mongo-button" onClick={handleStoreInMongo}>
              <Database size={16} />
              Almacenar Usuarios en Mongo
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <X size={16} />
          {error}
        </div>
      )}

      {mongoSuccess && (
        <div className="success-message">
          <Save size={16} />
          {mongoSuccess}
        </div>
      )}

      {isFormVisible && (
        <div className="form-container">
          <h2 className="form-title">
            {editingId ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                <User size={16} />
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="form-input"
                placeholder="Nombre completo"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Correo
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="form-input"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <Key size={16} />
                Contraseña
              </label>
              <input
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="form-input"
                placeholder={editingId ? "Dejar en blanco para mantener" : "Contraseña"}
                required={!editingId}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <Shield size={16} />
                Rol
              </label>
              <select
                value={idRol}
                onChange={(e) => setIdRol(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Seleccionar rol</option>
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="cancel-button" onClick={handleCancel}>
              <X size={16} />
              Cancelar
            </button>
            <button
              className="save-button"
              onClick={() => (editingId ? updateUsuario(editingId) : createUsuario())}
            >
              <Save size={16} />
              {editingId ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
      )}

      <div className="table-container">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Cargando usuarios...</p>
          </div>
        ) : usuarios.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <p>No hay usuarios registrados</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentUsuarios.map((usuario) => (
                  <tr key={usuario.id_usuario}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>
                      <span className={`role-badge ${
                        usuario.id_rol === 1 ? "role-admin" : 
                        usuario.id_rol === 2 ? "role-user" : "role-other"
                      }`}>
                        <Shield size={12} />
                        {getRoleName(usuario.id_rol)}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(usuario)}
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => deleteUsuario(usuario.id_usuario)}
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {usuarios.length > 0 && (
        <div className="pagination">
          <button
            className="page-button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: Math.ceil(usuarios.length / usuariosPerPage) }).map((_, index) => (
            <button
              key={index}
              className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            className="page-button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(usuarios.length / usuariosPerPage)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default UsuariosCRUD