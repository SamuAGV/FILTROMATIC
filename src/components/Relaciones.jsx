"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  LinkIcon,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Settings,
  Cpu,
  User,
  Activity,
  AlertTriangle,
} from "lucide-react"

const API_URL = "https://api.filtromatic.xdn.com.mx/api/relaciones"
const CONTROLES_URL = "https://api.filtromatic.xdn.com.mx/api/controles"
const SENSORES_URL = "https://api.filtromatic.xdn.com.mx/api/sensor"
const USUARIOS_URL = "https://api.filtromatic.xdn.com.mx/api/registros"
const BANDAS_URL = "https://api.filtromatic.xdn.com.mx/api/banda"

const RelacionesCRUD = () => {
  const [relaciones, setRelaciones] = useState([])
  const [idControl, setIdControl] = useState("")
  const [idSensor, setIdSensor] = useState("")
  const [idUsuario, setIdUsuario] = useState("")
  const [idBanda, setIdBanda] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)

  // Listas completas de datos relacionados
  const [controles, setControles] = useState([])
  const [sensores, setSensores] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [bandas, setBandas] = useState([])
  const [loadingRelated, setLoadingRelated] = useState(false)

  useEffect(() => {
    fetchRelaciones()
    fetchDatosRelacionados()
  }, [])

  const fetchRelaciones = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(API_URL)
      setRelaciones(response.data)
    } catch (error) {
      console.error("Error fetching relaciones:", error)
      setError("Error al cargar las relaciones. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const fetchDatosRelacionados = async () => {
    try {
      setLoadingRelated(true)
      setError(null)

      // Obtener todos los datos relacionados en paralelo
      const [controlesResponse, sensoresResponse, usuariosResponse, bandasResponse] = await Promise.all([
        axios.get(CONTROLES_URL),
        axios.get(SENSORES_URL),
        axios.get(USUARIOS_URL),
        axios.get(BANDAS_URL),
      ])

      setControles(controlesResponse.data)
      setSensores(sensoresResponse.data)
      setUsuarios(usuariosResponse.data)
      setBandas(bandasResponse.data)
    } catch (error) {
      console.error("Error fetching datos relacionados:", error)
      setError("Error al cargar los datos relacionados. Por favor, intente nuevamente.")
    } finally {
      setLoadingRelated(false)
    }
  }

  const createRelacion = async () => {
    try {
      setLoading(true)
      setError(null)
      await axios.post(API_URL, {
        id_control: idControl,
        id_sensor: idSensor,
        id_usuario: idUsuario,
        id_banda: idBanda,
      })
      resetForm()
      fetchRelaciones()
      setIsFormVisible(false)
    } catch (error) {
      console.error("Error creating relacion:", error)
      setError("Error al crear la relación. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const updateRelacion = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await axios.put(`${API_URL}/${id}`, {
        id_control: idControl,
        id_sensor: idSensor,
        id_usuario: idUsuario,
        id_banda: idBanda,
      })
      resetForm()
      fetchRelaciones()
      setIsFormVisible(false)
    } catch (error) {
      console.error("Error updating relacion:", error)
      setError("Error al actualizar la relación. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const deleteRelacion = async (id) => {
    if (!confirm("¿Está seguro que desea eliminar esta relación?")) return

    try {
      setLoading(true)
      setError(null)
      await axios.delete(`${API_URL}/${id}`)
      fetchRelaciones()
    } catch (error) {
      console.error("Error deleting relacion:", error)
      setError("Error al eliminar la relación. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setIdControl("")
    setIdSensor("")
    setIdUsuario("")
    setIdBanda("")
    setEditingId(null)
    setError(null)
  }

  const handleEdit = (relacion) => {
    setIdControl(relacion.id_control)
    setIdSensor(relacion.id_sensor)
    setIdUsuario(relacion.id_usuario)
    setIdBanda(relacion.id_banda)
    setEditingId(relacion.id_relaciones)
    setIsFormVisible(true)
  }

  const handleCancel = () => {
    resetForm()
    setIsFormVisible(false)
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = relaciones.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(relaciones.length / itemsPerPage)

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return
    setCurrentPage(pageNumber)
  }

  return (
    <div className="relaciones-container">
      <style jsx>{`
        /* Base Styles */
        .relaciones-container {
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
        
        .form-select {
          padding: 10px 12px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 6px;
          color: #f8fafc;
          font-size: 14px;
          transition: all 0.3s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 16px;
          padding-right: 36px;
        }
        
        .form-select:focus {
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
        
        .entity-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: #38bdf8;
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
        <h1 className="title">Gestión de Relaciones</h1>
        {!isFormVisible && (
          <button className="add-button" onClick={() => setIsFormVisible(true)}>
            <Plus size={16} />
            Agregar Relación
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
            <LinkIcon size={18} />
            {editingId ? "Editar Relación" : "Nueva Relación"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              editingId ? updateRelacion(editingId) : createRelacion()
            }}
          >
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <Settings size={16} />
                  Control
                </label>
                <select
                  value={idControl}
                  onChange={(e) => setIdControl(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Seleccione un control</option>
                  {controles.map((control) => (
                    <option key={control.id_control} value={control.id_control}>
                      {control.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Cpu size={16} />
                  Sensor
                </label>
                <select value={idSensor} onChange={(e) => setIdSensor(e.target.value)} className="form-select" required>
                  <option value="">Seleccione un sensor</option>
                  {sensores.map((sensor) => (
                    <option key={sensor.id_sensor} value={sensor.id_sensor}>
                      {sensor.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <User size={16} />
                  Usuario
                </label>
                <select
                  value={idUsuario}
                  onChange={(e) => setIdUsuario(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id_usuario} value={usuario.id_usuario}>
                      {usuario.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Activity size={16} />
                  Banda
                </label>
                <select value={idBanda} onChange={(e) => setIdBanda(e.target.value)} className="form-select" required>
                  <option value="">Seleccione una banda</option>
                  {bandas.map((banda) => (
                    <option key={banda.id_banda} value={banda.id_banda}>
                      {banda.nombre}
                    </option>
                  ))}
                </select>
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
        {loading || loadingRelated ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Cargando relaciones...</p>
          </div>
        ) : relaciones.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔗</div>
            <p>No hay relaciones registradas</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Control</th>
                  <th>Sensor</th>
                  <th>Usuario</th>
                  <th>Banda</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((relacion) => (
                  <tr key={relacion.id_relaciones}>
                    <td>
                      <span className="entity-badge">
                        <Settings size={12} />
                        {controles.find((c) => c.id_control === relacion.id_control)?.nombre || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="entity-badge">
                        <Cpu size={12} />
                        {sensores.find((s) => s.id_sensor === relacion.id_sensor)?.nombre || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="entity-badge">
                        <User size={12} />
                        {usuarios.find((u) => u.id_usuario === relacion.id_usuario)?.nombre || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="entity-badge">
                        <Activity size={12} />
                        {bandas.find((b) => b.id_banda === relacion.id_banda)?.nombre || "N/A"}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="edit-button" onClick={() => handleEdit(relacion)} title="Editar">
                          <Edit size={16} />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => deleteRelacion(relacion.id_relaciones)}
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

      {relaciones.length > 0 && (
        <div className="pagination">
          <button className="page-button" onClick={() => paginate(1)} disabled={currentPage === 1}>
            <ChevronLeft size={14} />
            <ChevronLeft size={14} style={{ marginLeft: "-6px" }} />
          </button>
          <button className="page-button" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            let pageNumber

            if (totalPages <= 5) {
              pageNumber = index + 1
            } else if (currentPage <= 3) {
              pageNumber = index + 1
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + index
            } else {
              pageNumber = currentPage - 2 + index
            }

            return (
              <button
                key={pageNumber}
                className={`page-button ${currentPage === pageNumber ? "active" : ""}`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          })}

          <button
            className="page-button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
          <button className="page-button" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
            <ChevronRight size={14} />
            <ChevronRight size={14} style={{ marginLeft: "-6px" }} />
          </button>
        </div>
      )}
    </div>
  )
}

export default RelacionesCRUD

