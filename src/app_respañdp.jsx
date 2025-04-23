import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Clientes from "./components/ClienteCRUD";
import Roles from "./components/Roles";
import Usuarios from "./components/Usuarios";
import Registros from "./components/Registros";
import Banda from "./components/Banda";
import Controles from "./components/Controles";
import Sensor from "./components/Sensor";
import Relaciones from "./components/Relaciones";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
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
      </Routes>
    </Router>
  );
};

export default App;