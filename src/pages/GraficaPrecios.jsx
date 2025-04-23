"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GraficaPrecios = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulación de datos de la API
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api/precios");
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="precioNacional" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="precioInternacional" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficaPrecios;