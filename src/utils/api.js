import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
/* 
Configura Axios con una URL base para evitar repetir "http://localhost:3001/api" en cada petición.
Define los encabezados (headers) para indicar que enviamos datos en formato JSON.
Exporta api, un objeto personalizado de Axios listo para usar en cualquier componente.
*/