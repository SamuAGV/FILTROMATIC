"use client"

import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import readXlsxFile from "read-excel-file"
import {
  User,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Phone,
  Mail,
  MapPin,
  Upload,
  RefreshCw,
  FileText,
  Database,
} from "lucide-react"

const API_BASE_URL = "https://api.filtromatic.xdn.com.mx/api/clientes"

const ClientesCRUD = () => {
  const [clientes, setClientes] = useState([])
  const [clientesFiltrados, setClientesFiltrados] = useState([])
  const [form, setForm] = useState({ Nombre: "", Teléfono: "", Email: "", Dirección: "" })
  const [editando, setEditando] = useState(false)
  const [idCliente, setIdCliente] = useState(null)
  const [paginaActual, setPaginaActual] = useState(1)
  const [busqueda, setBusqueda] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [importLoading, setImportLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [mongoSuccess, setMongoSuccess] = useState(null)
  const clientesPorPagina = 8

  useEffect(() => {
    obtenerClientes()
  }, [])

  useEffect(() => {
    filtrarClientes()
  }, [busqueda, clientes])

  const obtenerClientes = async () => {
    setLoading(true)
    try {
      const response = await axios.get(API_BASE_URL)
      setClientes(response.data)
      setClientesFiltrados(response.data)
      setError(null)
    } catch (error) {
      console.error("Error al obtener clientes:", error)
      setError("Error al cargar los clientes. Intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const filtrarClientes = () => {
    if (!busqueda.trim()) {
      setClientesFiltrados(clientes)
      return
    }

    const searchTerm = busqueda.toLowerCase()
    const resultado = clientes.filter((cliente) =>
      Object.values(cliente).some((valor) => valor && valor.toString().toLowerCase().includes(searchTerm)),
    )
    setClientesFiltrados(resultado)
    setPaginaActual(1)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSearchChange = (e) => {
    setBusqueda(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editando) {
        await axios.put(`${API_BASE_URL}/${idCliente}`, form)
        setError(null)
      } else {
        await axios.post(API_BASE_URL, form)
        setError(null)
      }
      resetForm()
      obtenerClientes()
      setIsFormVisible(false)
    } catch (error) {
      console.error("Error al guardar cliente:", error)
      setError("Error al guardar el cliente. Verifique los datos e intente nuevamente.")
    }
  }

  const resetForm = () => {
    setForm({ Nombre: "", Teléfono: "", Email: "", Dirección: "" })
    setEditando(false)
    setIdCliente(null)
  }

  const editarCliente = (cliente) => {
    setForm({
      Nombre: cliente.Nombre,
      Teléfono: cliente.Teléfono,
      Email: cliente.Email,
      Dirección: cliente.Dirección,
    })
    setIdCliente(cliente.id_cliente)
    setEditando(true)
    setIsFormVisible(true)
  }

  const eliminarCliente = async (id) => {
    if (!confirm("¿Está seguro que desea eliminar este cliente?")) return

    try {
      await axios.delete(`${API_BASE_URL}/${id}`)
      obtenerClientes()
      setError(null)
    } catch (error) {
      console.error("Error al eliminar cliente:", error)
      setError("Error al eliminar el cliente. Intente nuevamente.")
    }
  }

  // Lógica de paginación
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina)

  const clientesActuales = useMemo(() => {
    const indexUltimoCliente = paginaActual * clientesPorPagina
    const indexPrimerCliente = indexUltimoCliente - clientesPorPagina
    return clientesFiltrados.slice(indexPrimerCliente, indexUltimoCliente)
  }, [clientesFiltrados, paginaActual])

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina)
  }

  // Manejo de importación de Excel
  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleImport = async () => {
    if (!file) {
      setError("Seleccione un archivo Excel primero.")
      return
    }

    setImportLoading(true)
    try {
      const rows = await readXlsxFile(file)

      // Verificar que el archivo tenga al menos una fila de encabezado y una de datos
      if (rows.length < 2) {
        setError("El archivo no contiene datos válidos.")
        setImportLoading(false)
        return
      }

      const clientesData = rows.slice(1).map((row) => ({
        Nombre: row[0] || "",
        Teléfono: row[1] || "",
        Email: row[2] || "",
        Dirección: row[3] || "",
      }))

      const response = await axios.post(`${API_BASE_URL}/importar-clientes`, { clientes: clientesData })
      setError(null)
      obtenerClientes()

      // Mostrar mensaje de éxito
      alert(`${response.data.message} - ${response.data.rechazados} registros rechazados.`)
    } catch (error) {
      console.error("Error al importar clientes:", error)
      setError("Error al importar el archivo. Verifique el formato e intente nuevamente.")
    } finally {
      setImportLoading(false)
      // Limpiar el input de archivo
      setFile(null)
      const fileInput = document.getElementById("excel-file")
      if (fileInput) fileInput.value = ""
    }
  }

  const handleStoreInMongo = () => {
    setMongoSuccess("Clientes almacenados en MongoDB correctamente")
    setTimeout(() => setMongoSuccess(null), 3000)
  }

  return (
    <div className="clientes-container">
      <style jsx>{`
        /* Base Styles */
        .clientes-container {
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
        
        .actions-container {
          display: flex;
          gap: 12px;
          align-items: center;
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
        
        /* Search Styles */
        .search-container {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
        }
        
        .search-input {
          width: 100%;
          padding: 10px 12px 10px 40px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 8px;
          color: #f8fafc;
          font-size: 14px;
          transition: all 0.3s;
        }
        
        .search-input:focus {
          outline: none;
          border-color: rgba(56, 189, 248, 0.3);
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.1);
        }
        
        /* Import Section */
        .import-section {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .import-title {
          font-size: 16px;
          font-weight: 600;
          color: #f8fafc;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .file-input-container {
          position: relative;
          flex: 1;
          min-width: 200px;
        }
        
        .file-input {
          width: 100%;
          padding: 10px 12px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 6px;
          color: #f8fafc;
          font-size: 14px;
          cursor: pointer;
        }
        
        .file-input::file-selector-button {
          background: rgba(56, 189, 248, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          border-radius: 4px;
          padding: 6px 12px;
          margin-right: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .file-input::file-selector-button:hover {
          background: rgba(56, 189, 248, 0.3);
        }
        
        .import-button {
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
          white-space: nowrap;
        }
        
        .import-button:hover:not(:disabled) {
          background: rgba(16, 185, 129, 0.3);
          transform: translateY(-2px);
        }
        
        .import-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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
          min-width: 800px;
          width: 100%;
          border-collapse: collapse;
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
        <h1 className="title">Gestión de Clientes</h1>
        <div className="actions-container">
          {!isFormVisible && (
            <>
              <button className="add-button" onClick={() => setIsFormVisible(true)}>
                <Plus size={16} />
                Agregar Cliente
              </button>
              <button className="mongo-button" onClick={handleStoreInMongo}>
                <Database size={16} />
                Almacenar en Mongo
              </button>
            </>
          )}
        </div>
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

      <div className="import-section">
        <h2 className="import-title">
          <FileText size={18} />
          Importar Clientes
        </h2>
        <div className="file-input-container">
          <input type="file" id="excel-file" accept=".xlsx, .xls" onChange={handleFileChange} className="file-input" />
        </div>
        <button onClick={handleImport} className="import-button" disabled={!file || importLoading}>
          {importLoading ? <RefreshCw className="animate-spin" size={16} /> : <Upload size={16} />}
          {importLoading ? "Importando..." : "Importar Excel"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-container">
          <h2 className="form-title">{editando ? "Editar Cliente" : "Nuevo Cliente"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <User size={16} />
                  Nombre
                </label>
                <input
                  type="text"
                  name="Nombre"
                  value={form.Nombre}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Phone size={16} />
                  Teléfono
                </label>
                <input
                  type="text"
                  name="Teléfono"
                  value={form.Teléfono}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Número de teléfono"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} />
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={form.Email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={16} />
                  Dirección
                </label>
                <input
                  type="text"
                  name="Dirección"
                  value={form.Dirección}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Dirección completa"
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  resetForm()
                  setIsFormVisible(false)
                }}
              >
                <X size={16} />
                Cancelar
              </button>
              <button type="submit" className="save-button">
                <Save size={16} />
                {editando ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={busqueda}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <div className="table-wrapper">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Cargando clientes...</p>
            </div>
          ) : clientesFiltrados.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <p>{busqueda ? "No se encontraron clientes con esa búsqueda" : "No hay clientes registrados"}</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientesActuales.map((cliente) => (
                  <tr key={cliente.id_cliente}>
                    <td>{cliente.Nombre}</td>
                    <td>{cliente.Teléfono}</td>
                    <td>{cliente.Email}</td>
                    <td>{cliente.Dirección}</td>
                    <td>
                      <div className="actions">
                        <button className="edit-button" onClick={() => editarCliente(cliente)} title="Editar">
                          <Edit size={16} />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => eliminarCliente(cliente.id_cliente)}
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
          )}
        </div>
      </div>

      {clientesFiltrados.length > 0 && (
        <div className="pagination">
          <button className="page-button" onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: Math.min(5, totalPaginas) }).map((_, index) => {
            let pageNumber

            if (totalPaginas <= 5) {
              pageNumber = index + 1
            } else if (paginaActual <= 3) {
              pageNumber = index + 1
            } else if (paginaActual >= totalPaginas - 2) {
              pageNumber = totalPaginas - 4 + index
            } else {
              pageNumber = paginaActual - 2 + index
            }

            return (
              <button
                key={pageNumber}
                className={`page-button ${paginaActual === pageNumber ? "active" : ""}`}
                onClick={() => cambiarPagina(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          })}

          <button
            className="page-button"
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ClientesCRUD

