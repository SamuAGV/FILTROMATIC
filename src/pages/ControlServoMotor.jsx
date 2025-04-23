"use client"

import { useState, useEffect } from "react"

const ControlServoMotor = () => {
  const [servoStatus, setServoStatus] = useState("Desactivado")
  const [motorStatus, setMotorStatus] = useState("Apagado")
  const [statusMessage, setStatusMessage] = useState("Esperando...")
  const [colores, setColores] = useState([])
  const [bandas, setBandas] = useState([])
  const [arduinoData, setArduinoData] = useState([]) 
  const [selectedBand, setSelectedBand] = useState("")
  const [selectedArduino, setSelectedArduino] = useState("")
  const [intensidad, setIntensidad] = useState(100)
  const [nombreObjeto, setNombreObjeto] = useState("")
  const [motorSpeed, setMotorSpeed] = useState(0)
  const [velocidades, setVelocidades] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [coloresRes, bandasRes] = await Promise.all([
        fetch("https://api.filtromatic.xdn.com.mx/api/getColores").then((res) => res.json()),
        fetch("https://api.filtromatic.xdn.com.mx/api/getBandas").then((res) => res.json()),
      ])

      setColores(coloresRes)
      setBandas(bandasRes)
    } catch (error) {
      console.error("Error al obtener datos iniciales", error)
      setStatusMessage("Error al cargar datos iniciales")
    } finally {
      setLoading(false)
    }
  }

  const handleBandChange = async (e) => {
    const band = e.target.value
    setSelectedBand(band)
    if (band === "Banda A") {
      fetchVelocidades()
      await fetchArduinoData()
    } else {
      setVelocidades([])
      setArduinoData([])
    }
  }

  const fetchArduinoData = async () => {
    setLoading(true)
    try {
      const data = await fetch("https://api.filtromatic.xdn.com.mx/api/getArduinoData").then((res) => res.json())
      setArduinoData(data)
    } catch (error) {
      console.error("Error al obtener datos de Arduino", error)
      setStatusMessage("Error al cargar datos de Arduino")
    } finally {
      setLoading(false)
    }
  }

  const fetchVelocidades = async () => {
    setLoading(true)
    try {
      const data = await fetch("https://api.filtromatic.xdn.com.mx/api/getVelocidades").then((res) => res.json())
      setVelocidades(data)
    } catch (error) {
      console.error("Error al obtener las velocidades", error)
      setStatusMessage("Error al cargar velocidades")
    } finally {
      setLoading(false)
    }
  }

  const sendCommand = async (command, type = "servo") => {
    if (selectedBand === "Banda A" && selectedArduino) {
      const ipArduino = selectedArduino.ip;
      setLoading(true)
      try {
        const response = await fetch(`http://${ipArduino}/${command}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.text()
        setStatusMessage(data)

        if (command === "ENCENDER") {
          if (type === "servo") setServoStatus("Activado")
          if (type === "motor") setMotorStatus("Encendido")
        } else if (command === "APAGAR") {
          if (type === "servo") setServoStatus("Desactivado")
          if (type === "motor") setMotorStatus("Apagado")
        }
      } catch (error) {
        console.error("Error de conexión:", error)
        setStatusMessage("Error en la conexión")
      } finally {
        setLoading(false)
      }
    } else {
      setStatusMessage("Selecciona una banda y un Arduino.")
    }
  }

  const sendSpeedCommand = async () => {
    if (motorSpeed >= 0 && motorSpeed <= 255 && selectedArduino) {
      const ipArduino = selectedArduino.ip;
      setLoading(true)
      try {
        const response = await fetch(`http://${ipArduino}/speed/${motorSpeed}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.text()
        setStatusMessage(data)
      } catch (error) {
        console.error("Error de conexión:", error)
        setStatusMessage("Error al enviar el comando de velocidad")
      } finally {
        setLoading(false)
      }
    } else {
      setStatusMessage("Selecciona una velocidad válida y un Arduino.")
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h1 style={styles.title}>Control de Servos y Motor</h1>
          <div style={styles.statusBar}>
            <div style={styles.statusItem}>
              <span style={styles.statusText}>Servo: <span style={servoStatus === "Activado" ? styles.statusActive : styles.statusInactive}>{servoStatus}</span></span>
            </div>
            <div style={styles.statusItem}>
              <span style={styles.statusText}>Motor: <span style={motorStatus === "Encendido" ? styles.statusActive : styles.statusInactive}>{motorStatus}</span></span>
            </div>
          </div>
        </div>

        <div style={styles.cardContent}>
          {statusMessage && (
            <div style={styles.alert}>
              <span>{statusMessage}</span>
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Seleccionar Banda</label>
            <select 
              value={selectedBand} 
              onChange={handleBandChange} 
              style={styles.select}
              disabled={loading}
            >
              <option value="">Seleccione una banda</option>
              {bandas.map((banda) => (
                <option key={banda.id_banda} value={banda.nombre}>
                  {banda.nombre}
                </option>
              ))}
            </select>
          </div>

          {selectedBand && arduinoData.length > 0 && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Seleccionar Arduino</label>
              <select 
                value={selectedArduino.id} 
                onChange={(e) => setSelectedArduino(arduinoData.find(arduino => arduino.id == e.target.value))} 
                style={styles.select}
                disabled={loading}
              >
                <option value="">Seleccione un Arduino</option>
                {arduinoData.map((arduino) => (
                  <option key={arduino.id} value={arduino.id}>
                    {`Arduino ${arduino.id} - ${arduino.ip}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Control de Velocidad del Motor (0-255)</label>
            <input
              type="range"
              min="0"
              max="255"
              value={motorSpeed}
              onChange={(e) => setMotorSpeed(e.target.value)}
              style={styles.slider}
              disabled={loading}
            />
            <div style={styles.speedValue}>{motorSpeed} RPM</div>
          </div>

          <div style={styles.buttonGroup}>
            <button 
              onClick={() => sendCommand("ENCENDER", "servo")} 
              style={servoStatus === "Activado" ? {...styles.button, ...styles.buttonActive} : styles.button}
              disabled={loading || !selectedArduino}
            >
              Encender Servo
            </button>
            <button 
              onClick={() => sendCommand("APAGAR", "servo")} 
              style={styles.button}
              disabled={loading || !selectedArduino}
            >
              Apagar Servo
            </button>

            <button 
              onClick={() => sendCommand("encender", "motor")} 
              style={motorStatus === "Encendido" ? {...styles.button, ...styles.buttonActive} : styles.button}
              disabled={loading || !selectedArduino}
            >
              Encender Motor
            </button>
            <button 
              onClick={() => sendCommand("apagar", "motor")} 
              style={styles.button}
              disabled={loading || !selectedArduino}
            >
              Apagar Motor
            </button>

            <button 
              onClick={sendSpeedCommand} 
              style={styles.buttonPrimary}
              disabled={loading || !selectedArduino}
            >
              Establecer Velocidad
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
    fontFamily: '"Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    padding: '25px',
    width: '100%',
    maxWidth: '500px',
    transition: 'all 0.3s ease',
  },
  cardHeader: {
    borderBottom: '1px solid #e1e5eb',
    paddingBottom: '15px',
    marginBottom: '20px',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '24px',
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
  },
  cardContent: {
    marginTop: '10px',
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '10px',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: '#f8f9fa',
  },
  statusText: {
    fontSize: '14px',
    color: '#4a5568',
    fontWeight: '500',
  },
  statusActive: {
    color: '#10b981',
    fontWeight: '600',
  },
  statusInactive: {
    color: '#ef4444',
    fontWeight: '600',
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#e6f7ff',
    border: '1px solid #91d5ff',
    color: '#1890ff',
    fontSize: '14px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    marginBottom: '8px',
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fff',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    outline: 'none',
    ':focus': {
      borderColor: '#3182ce',
      boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.2)',
    },
    ':disabled': {
      backgroundColor: '#f8f9fa',
      cursor: 'not-allowed',
    },
  },
  slider: {
    width: '100%',
    margin: '10px 0',
    height: '8px',
    borderRadius: '4px',
    background: '#e2e8f0',
    outline: 'none',
    transition: 'all 0.2s ease',
    ':disabled': {
      opacity: '0.7',
      cursor: 'not-allowed',
    },
    '::-webkit-slider-thumb': {
      appearance: 'none',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: '#3182ce',
      cursor: 'pointer',
    },
  },
  speedValue: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '600',
    color: '#3182ce',
    marginTop: '5px',
  },
  buttonGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginTop: '20px',
  },
  button: {
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#cbd5e0',
    },
    ':disabled': {
      backgroundColor: '#edf2f7',
      color: '#a0aec0',
      cursor: 'not-allowed',
    },
  },
  buttonActive: {
    backgroundColor: '#10b981',
    color: '#fff',
    ':hover': {
      backgroundColor: '#0d9f6e',
    },
  },
  buttonPrimary: {
    gridColumn: '1 / -1',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3182ce',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#2c5282',
    },
    ':disabled': {
      backgroundColor: '#bee3f8',
      cursor: 'not-allowed',
    },
  },
}

export default ControlServoMotor