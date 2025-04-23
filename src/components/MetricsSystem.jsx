"use client"
import { Database, Activity, Settings, Users, Zap, BarChart } from "lucide-react"

const MetricsSystem = ({ metrics, advancedStats }) => {
  return (
    <div className="metrics-grid">
      <style jsx>{`
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
        
        @media (max-width: 480px) {
          .metrics-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
        
        .metric-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(56, 189, 248, 0.1);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
          position: relative;
        }
        
        .metric-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, transparent 100%);
          z-index: 0;
        }
        
        .metric-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border-color: rgba(56, 189, 248, 0.3);
        }
        
        .metric-icon-container {
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
          z-index: 1;
        }
        
        .metric-icon {
          color: white;
          width: 24px;
          height: 24px;
        }
        
        .metric-content {
          padding: 20px;
          flex: 1;
          position: relative;
          z-index: 1;
        }
        
        .metric-title {
          font-size: 16px;
          font-weight: 500;
          color: #94a3b8;
          margin: 0 0 10px 0;
        }
        
        .metric-value {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          color: #f8fafc;
        }
        
        .metric-unit {
          font-size: 14px;
          color: #94a3b8;
          font-weight: normal;
        }
        
        @media (max-width: 480px) {
          .metric-card {
            flex-direction: row;
          }
          
          .metric-icon-container {
            width: 60px;
          }
          
          .metric-content {
            padding: 15px;
          }
          
          .metric-title {
            font-size: 14px;
            margin: 0 0 8px 0;
          }
          
          .metric-value {
            font-size: 20px;
          }
          
          .metric-unit {
            font-size: 12px;
          }
        }
      `}</style>

      <MetricCard
        title="Total Sensores"
        value={metrics?.totalSensores}
        unit="sensores"
        icon={<BarChart className="metric-icon" />}
        color="#4361ee"
      />
      <MetricCard
        title="Total Registros"
        value={metrics?.totalRegistros}
        unit="registros"
        icon={<Database className="metric-icon" />}
        color="#3a0ca3"
      />
      <MetricCard
        title="Bandas Activas"
        value={metrics?.bandasActivas}
        unit={`de ${metrics?.totalBandas}`}
        icon={<Activity className="metric-icon" />}
        color="#7209b7"
      />
      <MetricCard
        title="Controladores"
        value={metrics?.controladoresActivos}
        unit="activos"
        icon={<Settings className="metric-icon" />}
        color="#f72585"
      />
      <MetricCard
        title="Clientes"
        value={advancedStats?.totalClientes}
        unit="registrados"
        icon={<Users className="metric-icon" />}
        color="#4cc9f0"
      />
      <MetricCard
        title="Velocidad Promedio"
        value={advancedStats?.velocidadPromedio?.toFixed(2)}
        unit="m/s"
        icon={<Zap className="metric-icon" />}
        color="#4895ef"
      />
    </div>
  )
}

const MetricCard = ({ title, value, unit, icon, color }) => (
  <div className="metric-card">
    <div className="metric-icon-container" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <div className="metric-content">
      <h3 className="metric-title">{title}</h3>
      <p className="metric-value">
        {value || "--"} <span className="metric-unit">{unit}</span>
      </p>
    </div>
  </div>
)

export default MetricsSystem

