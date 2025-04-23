import React from "react";
import App from "./App";  // Importamos App en lugar de rutas directamente

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardAdmin from "./pages/AdminDashboard";
import DashboardUser from "./pages/UserDashboard";
//import DashboardVendedor from "./pages/DashboardVendedor";
//import Home from "./pages/Home";
//import NotFound from "./pages/NotFound";

//import "./styles.css"; // Archivo para estilos globales
import ClienteCRUD from "./components/ClienteCRUD";
import Roles from "./components/Roles";
import Usuarios from "./components/Usuarios";
import Registros from "./components/Registros";
import Banda from "./components/Banda";
import Controles from "./components/Controles";
import Sensor from "./components/Sensor";
import Relaciones from "./components/Relaciones";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <App />  {/* Renderizamos App que ya tiene la Navbar y las rutas */}
  </React.StrictMode>
);
/*
  Renderiza la aplicación en el DOM.
  Configura la navegación con react-router-dom.
  Se asegura de que la aplicación funcione dentro de React.StrictMode (ayuda a detectar problemas en desarrollo).
*/