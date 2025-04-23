import { useLocation, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";  // Importar Navbar aquí
import Register from "./Register";
import Login from "./Login";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import Clientes from "../components/ClienteCRUD";
import Roles from "../components/Roles";
import Usuarios from "../components/Usuarios";
import Registros from "../components/Registros";
import Banda from "../components/Banda";
import Controles from "../components/Controles";
import Sensor from "../components/Sensor";
import Relaciones from "../components/Relaciones";
import ControlServoMotor from "../pages/ControlServoMotor";
import MetricsSystem from "./MetricsSystem";
import RecentActivity from "./RecentActivity";
import Inicio from "../pages/inicio";
import Developers from "../pages/Developers";

const Layout = () => {
  const location = useLocation(); // Obtiene la ruta actual

  // Lista de rutas donde NO quieres que aparezca la Navbar
  const noNavbarRoutes = ["/", "/login", "/admin", "/user", "/inicio", "/register", "/developers"];

  // Verifica si la ruta actual está en la lista de rutas donde no debe aparecer la Navbar
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />} {/* Renderiza Navbar solo si no está en las rutas especificadas */}
      <Routes>
        <Route path="/" element={<Inicio />} /> {/* Ruta principal actualizada */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/registros" element={<Registros />} />
        <Route path="/banda" element={<Banda />} />
        <Route path="/controles" element={<Controles />} />
        <Route path="/sensores" element={<Sensor />} />
        <Route path="/relaciones" element={<Relaciones />} />
        <Route path="/control-servo-motor" element={<ControlServoMotor />} />
        <Route path="/metrics-system" element={<MetricsSystem />} />
        <Route path="/recent-activity" element={<RecentActivity />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/developers" element={<Developers />} />
        {/* Puedes agregar más rutas aquí */}        
      </Routes>
    </>
  );
};

export default Layout;
