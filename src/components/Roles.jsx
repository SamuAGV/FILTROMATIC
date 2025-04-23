"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Trash2, Edit2, Plus, Save, X, AlertCircle, Check } from "lucide-react"

const API_URL = "https://api.filtromatic.xdn.com.mx/api/roles"

const RolesCRUD = () => {
  const [roles, setRoles] = useState([])
  const [nombre, setNombre] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState(null)

  useEffect(() => {
    fetchRoles()
  }, [])

  // Limpiar mensajes después de 3 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null)
        setSuccess(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  const fetchRoles = async () => {
    setLoading(true)
    try {
      const response = await axios.get(API_URL)
      setRoles(response.data)
      setError(null)
    } catch (error) {
      console.error("Error fetching roles:", error)
      setError("No se pudieron cargar los roles. Intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const createRole = async () => {
    if (!nombre.trim()) {
      setError("Por favor ingrese un nombre para el rol")
      return
    }

    setLoading(true)
    try {
      await axios.post(API_URL, { nombre })
      setNombre("")
      fetchRoles()
      setSuccess("Rol creado exitosamente")
    } catch (error) {
      console.error("Error creating role:", error)
      setError("Error al crear el rol. Intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const updateRole = async (id) => {
    if (!nombre.trim()) {
      setError("Por favor ingrese un nombre para el rol")
      return
    }

    setLoading(true)
    try {
      await axios.put(`${API_URL}/${id}`, { nombre })
      setNombre("")
      setEditingId(null)
      fetchRoles()
      setSuccess("Rol actualizado exitosamente")
    } catch (error) {
      console.error("Error updating role:", error)
      setError("Error al actualizar el rol. Intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const deleteRole = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchRoles()
      setShowConfirmDelete(null)
      setSuccess("Rol eliminado exitosamente")
    } catch (error) {
      console.error("Error deleting role:", error)
      setError("Error al eliminar el rol. Intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setNombre("")
    setEditingId(null)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Gestión de Roles</h2>
          <p style={styles.subtitle}>Administre los roles del sistema</p>
        </div>

        {/* Mensajes de notificación */}
        {error && (
          <div style={styles.errorMessage}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={styles.successMessage}>
            <Check size={18} />
            <span>{success}</span>
          </div>
        )}

        {/* Formulario */}
        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre del Rol</label>
            <input
              type="text"
              placeholder="Ingrese el nombre del rol"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonGroup}>
            {editingId ? (
              <>
                <button onClick={() => updateRole(editingId)} style={styles.saveButton} disabled={loading}>
                  <Save size={16} />
                  <span>Guardar</span>
                </button>
                <button onClick={handleCancel} style={styles.cancelButton}>
                  <X size={16} />
                  <span>Cancelar</span>
                </button>
              </>
            ) : (
              <button onClick={createRole} style={styles.createButton} disabled={loading}>
                <Plus size={16} />
                <span>Crear Rol</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabla de roles */}
        <div style={styles.tableContainer}>
          <h3 style={styles.tableTitle}>Roles Existentes</h3>

          {loading && !roles.length ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p>Cargando roles...</p>
            </div>
          ) : roles.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No hay roles registrados. Cree uno nuevo.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Nombre</th>
                    <th style={styles.tableHeader}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.id_rol} style={styles.tableRow}>
                      <td style={styles.tableCell}>{role.id_rol}</td>
                      <td style={styles.tableCell}>{role.nombre}</td>
                      <td style={styles.tableCellActions}>
                        <button
                          onClick={() => {
                            setNombre(role.nombre)
                            setEditingId(role.id_rol)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }}
                          style={styles.editButton}
                          title="Editar"
                        >
                          <Edit2 size={16} />
                        </button>

                        {showConfirmDelete === role.id_rol ? (
                          <div style={styles.confirmDelete}>
                            <span>¿Confirmar?</span>
                            <button onClick={() => deleteRole(role.id_rol)} style={styles.confirmYesButton}>
                              Sí
                            </button>
                            <button onClick={() => setShowConfirmDelete(null)} style={styles.confirmNoButton}>
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowConfirmDelete(role.id_rol)}
                            style={styles.deleteButton}
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7fafc",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  header: {
    padding: "24px",
    borderBottom: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 8px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "12px 16px",
    borderRadius: "4px",
    margin: "16px 24px 0 24px",
    fontSize: "14px",
  },
  successMessage: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "12px 16px",
    borderRadius: "4px",
    margin: "16px 24px 0 24px",
    fontSize: "14px",
  },
  formContainer: {
    padding: "24px",
    borderBottom: "1px solid #e2e8f0",
  },
  inputGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#4b5563",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    transition: "border-color 0.2s ease",
    outline: "none",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  createButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "background-color 0.2s ease",
  },
  saveButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "background-color 0.2s ease",
  },
  cancelButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "background-color 0.2s ease",
  },
  tableContainer: {
    padding: "24px",
  },
  tableTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
    marginTop: 0,
    marginBottom: "16px",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    color: "#6b7280",
  },
  loadingSpinner: {
    width: "30px",
    height: "30px",
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 0",
    color: "#6b7280",
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    border: "1px dashed #d1d5db",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  tableHeader: {
    textAlign: "left",
    padding: "12px 16px",
    backgroundColor: "#f8fafc",
    color: "#4b5563",
    fontWeight: "600",
    borderBottom: "1px solid #e2e8f0",
  },
  tableRow: {
    borderBottom: "1px solid #e2e8f0",
    transition: "background-color 0.2s ease",
  },
  tableCell: {
    padding: "12px 16px",
    color: "#1e293b",
  },
  tableCellActions: {
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  editButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    backgroundColor: "#eff6ff",
    color: "#3b82f6",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    backgroundColor: "#fef2f2",
    color: "#ef4444",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  confirmDelete: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
  },
  confirmYesButton: {
    padding: "4px 8px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
  confirmNoButton: {
    padding: "4px 8px",
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
}

export default RolesCRUD

