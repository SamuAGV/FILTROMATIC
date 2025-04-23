"use client";

import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://api.filtromatic.xdn.com.mx/api";

const fetchMetrics = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/metricas`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Error al obtener métricas");
    return await response.json();
  } catch (error) {
    console.error("Error fetching metrics:", error);
    throw error;
  }
};

const RecentActivity = ({ dateRange, setDateRange, handleDateFilter, recentActivities, getStatusClass, getStatusIcon, formatDate }) => {
  return (
    <section className="activity-section">
      <div className="activity-header">
        <h2 className="section-title">Actividad Reciente</h2>
        <div className="date-filter">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="date-input"
          />
          <span style={{ color: "#94a3b8" }}>a</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="date-input"
          />
          <button onClick={handleDateFilter} className="filter-button">
            Filtrar
          </button>
        </div>
      </div>
      <div className="activity-list">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => (
            <div
              key={index}
              className={`activity-item ${getStatusClass(index % 3 === 0 ? "success" : index % 3 === 1 ? "warning" : "error")}`}
            >
              <div className="activity-content">
                {getStatusIcon(index % 3 === 0 ? "success" : index % 3 === 1 ? "warning" : "error")}
                <span className="activity-text">{`${activity.object} (ID: ${activity.id})`}</span>
              </div>
              <span className="activity-time">{`${formatDate(activity.fecha)} ${activity.hora}`}</span>
            </div>
          ))
        ) : (
          <div className="no-activities">
            <div className="no-activities-icon">📭</div>
            <p>No hay actividades en este rango de fechas</p>
          </div>
        )}
      </div>
    </section>
  );
};
<style jsx>{`
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
      `}</style>

export default RecentActivity;
