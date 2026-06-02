import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
// Páginas de Autenticación
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Páginas de Adoptante
import Home from "./pages/Home";
import Mascotas from "./pages/mascotas/Mascotas";
import FormularioAdopcion from "./pages/adopciones/FormularioAdopcion";
import MisSolicitudes from "./pages/adopciones/MisSolicitudes";
import Perfil from "./pages/adopciones/Perfil"; // Asegúrate de que la ruta sea correcta según tu carpeta

// Páginas de Administrador
import Solicitudes from "./pages/admin/Solicitudes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Usuarios from "./pages/admin/Usuarios";
import GestionMascotas from './pages/admin/GestionMascotas';

// Componentes
import Navbar from "./components/layout/Navbar";

const AppContent = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  const handleLoginSuccess = (rol) => {
    setUserRole(rol);
    sessionStorage.setItem("userRole", rol);
    // Redirección inteligente según el rol
    navigate(rol === "ADMIN" ? "/admin/dashboard" : "/mascotas");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUserRole(null);
    navigate("/");
  };

  return (
    <>
      <Navbar userRole={userRole} onLogout={handleLogout} />
      <div className="main-content" style={{ marginTop: '70px' }}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/registro" element={<Register />} />
          
          {/* Rutas de Adoptante */}
          <Route path="/mascotas" element={<Mascotas setMascotaSeleccionadaGlobal={setMascotaSeleccionada} />} />
          <Route path="/adopcion" element={
            <FormularioAdopcion 
              mascota={mascotaSeleccionada} 
              onVolver={() => navigate("/mascotas")} 
            />
          } />
          <Route path="/mis-solicitudes" element={<MisSolicitudes />} />
          <Route path="/perfil" element={<Perfil />} /> {/* <--- AGREGA ESTA RUTA */}

          {/* Rutas de Administrador */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/solicitudes" element={<Solicitudes />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/mascotas" element={<GestionMascotas />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  // Inicializamos el rol desde sessionStorage al cargar la app
  const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole") || null);
  
  return (
    <Router>
      <AppContent userRole={userRole} setUserRole={setUserRole} />
    </Router>
  );
};

export default App;