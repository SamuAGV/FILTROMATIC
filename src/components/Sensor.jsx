"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Cpu, Edit, Trash2, Plus, Save, X, ChevronLeft, ChevronRight, Zap, Palette, FileText, Power, AlertTriangle } from 'lucide-react'

const API_URL = "https://api.filtromatic.xdn.com.mx/api/sensor"

const SensoresCRUD = () => {
  const [sensores, setSensores] = useState([])
  const [nombre, setNombre] = useState("")
  const [intensidad, setIntensidad] = useState("")
  const [R_color, setRColor] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [activo, setActivo] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    fetchSensores()
  }, [])

  const fetchSensores = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(API_URL)
      setSensores(response.data)
    } catch (error) {
      console.error("Error fetching sensores:", error)
      setError("Error al cargar los sensores. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const createSensor = async () => {
    try {
      setLoading(true)
      setError(null)
      await axios.post(API_URL, { nombre, intensidad, R_color, descripcion, activo })
      resetForm()
      fetchSensores()
      setIsFormVisible(false)
    } catch (error) {
      console.error("Error creating sensor:", error)
      setError("Error al crear el sensor. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const updateSensor = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await axios.put(`${API_URL}/${id}`, { nombre, intensidad, R_color, descripcion, activo })
      resetForm()
      fetchSensores()
      setIsFormVisible(false)
    } catch (error) {
      console.error("Error updating sensor:", error)
      setError("Error al actualizar el sensor. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const deleteSensor = async (id) => {
    if (!confirm("¿Está seguro que desea eliminar este sensor?")) return
    
    try {
      setLoading(true)
      setError(null)
      await axios.delete(`${API_URL}/${id}`)
      fetchSensores()
    } catch (error) {
      console.error("Error deleting sensor:", error)
      setError("Error al eliminar el sensor. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setNombre("")
    setIntensidad("")
    setRColor("")
    setDescripcion("")
    setActivo(false)
    setEditingId(null)
    setError(null)
  }

  const handleEdit = (sensor) => {
    setNombre(sensor.nombre)
    setIntensidad(sensor.intensidad)
    setRColor(sensor.R_color)
    setDescripcion(sensor.descripcion)
    setActivo(sensor.activo)
    setEditingId(sensor.id_sensor)
    setIsFormVisible(true)
  }

  const handleCancel = () => {
    resetForm()
    setIsFormVisible(false)
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sensores.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sensores.length / itemsPerPage)

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return
    setCurrentPage(pageNumber)
  }

  return (
    <div className="sensores-container">
      <style jsx>{`
        /* Base Styles */
        .sensores-container {
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
        
        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .checkbox-label {
          font-size: 14px;
          font-weight: 500;
          color: #94a3b8;
          cursor: pointer;
          user-select: none;
        }
        
        .checkbox {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 4px;
          background: rgba(15, 23, 42, 0.8);
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
        }
        
        .checkbox:checked {
          background: rgba(56, 189, 248, 0.8);
          border-color: rgba(56, 189, 248, 0.8);
        }
        
        .checkbox:checked::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 6px;
          width: 4px;
          height: 9px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
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
          min-width: 800px;
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
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .status-active {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .status-inactive {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .color-preview {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-right: 8px;
          vertical-align: middle;
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
        
        .page-button:hover:not(:disabled) {
          background: rgba(56, 189, 248, 0.1);
          color: #f8fafc;
        }
        
        .page-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
      `}</style>

      <div className="header">
        <h1 className="title">Gestión de Sensores</h1>
        {!isFormVisible && (
          <button className="add-button" onClick={() => setIsFormVisible(true)}>
            <Plus size={16} />
            Agregar Sensor
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      {isFormVisible && (
        <div className="form-container">
          <h2 className="form-title">
            <Cpu size={18} />
            {editingId ? "Editar Sensor" : "Nuevo Sensor"}
          </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            editingId ? updateSensor(editingId) : createSensor();
          }}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <Cpu size={16} />
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="form-input"
                  placeholder="Nombre del sensor"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Zap size={16} />
                  Intensidad
                </label>
                <input
                  type="number"
                  value={intensidad}
                  onChange={(e) => setIntensidad(e.target.value)}
                  className="form-input"
                  placeholder="Nivel de intensidad"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Palette size={16} />
                  Color (R)
                </label>
                <input
                  type="text"
                  value={R_color}
                  onChange={(e) => setRColor(e.target.value)}
                  className="form-input"
                  placeholder="Valor R del color"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <FileText size={16} />
                  Descripción
                </label>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="form-input"
                  placeholder="Descripción del sensor"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Power size={16} />
                  Estado
                </label>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="activo"
                    checked={activo}
                    onChange={(e) => setActivo(e.target.checked)}
                    className="checkbox"
                  />
                  <label htmlFor="activo" className="checkbox-label">
                    Activo
                  </label>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={handleCancel}>
                <X size={16} />
                Cancelar
              </button>
              <button type="submit" className="save-button">
                <Save size={16} />
                {editingId ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Cargando sensores...</p>
          </div>
        ) : sensores.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔌</div>
            <p>No hay sensores registrados</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Intensidad</th>
                  <th>Color</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((sensor) => (
                  <tr key={sensor.id_sensor}>
                    <td>{sensor.nombre}</td>
                    <td>{sensor.intensidad}</td>
                    <td>
                      <span 
                        className="color-preview" 
                        style={{ backgroundColor: sensor.R_color }}
                      ></span>
                      {sensor.R_color}
                    </td>
                    <td>{sensor.descripcion}</td>
                    <td>
                      <span className={`status-badge ${sensor.activo ? "status-active" : "status-inactive"}`}>
                        <Power size={12} />
                        {sensor.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(sensor)}
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => deleteSensor(sensor.id_sensor)}
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

      {sensores.length > 0 && (
        <div className="pagination">
          <button
            className="page-button"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={14} />
            <ChevronLeft size={14} style={{ marginLeft: "-6px" }} />
          </button>
          <button
            className="page-button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            let pageNumber;
            
            if (totalPages <= 5) {
              pageNumber = index + 1;
            } else if (currentPage <= 3) {
              pageNumber = index + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + index;
            } else {
              pageNumber = currentPage - 2 + index;
            }
            
            return (
              <button
                key={pageNumber}
                className={`page-button ${currentPage === pageNumber ? "active" : ""}`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
          
          <button
            className="page-button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
          <button
            className="page-button"
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={14} />
            <ChevronRight size={14} style={{ marginLeft: "-6px" }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SensoresCRUD;
