import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";  // Importamos el componente Layout
import Developers from "./pages/Developers";

const App = () => {
  return (
    <Router>
      <Layout />  {/* Layout maneja la Navbar y las rutas */}
      <Routes>
        <Route path="/developers" element={<Developers />} />
      </Routes>
    </Router>
  )
};

export default App;
