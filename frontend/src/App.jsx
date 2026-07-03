import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Páginas de Autenticación
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Páginas de Adoptante
import Home from "./pages/Home";
import Mascotas from "./pages/mascotas/Mascotas";
import FormularioAdopcion from "./pages/adopciones/FormularioAdopcion";
import MisSolicitudes from "./pages/adopciones/MisSolicitudes";
import Perfil from "./pages/adopciones/Perfil";
import DashboardUsuario from "./pages/adopciones/DashboardUsuario"; // Tu nuevo componente

// Páginas de Administrador
import Solicitudes from "./pages/admin/Solicitudes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Usuarios from "./pages/admin/Usuarios";
import GestionMascotas from './pages/admin/GestionMascotas';

// Componentes
import Navbar from "./components/layout/Navbar";

const AppContent = ({ userRole, setUserRole }) => {
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  const handleLoginSuccess = (rol) => {
    setUserRole(rol);
    sessionStorage.setItem("userRole", rol);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUserRole(null);
  };

  return (
    <>
      <Navbar userRole={userRole} onLogout={handleLogout} />
      <div className="main-content" style={{ marginTop: '70px' }}>
        <Routes>
          {/* Lógica de Redirección Inteligente en la raíz */}
          <Route path="/" element={
            userRole ? (
              <Navigate to={userRole === "ADMIN" ? "/admin/dashboard" : "/dashboard"} />
            ) : (
              <Home />
            )
          } />

          {/* Rutas Públicas */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/registro" element={<Register />} />
          
          {/* Rutas de Adoptante */}
          <Route path="/dashboard" element={userRole ? <DashboardUsuario /> : <Navigate to="/login" />} />
          <Route path="/mascotas" element={<Mascotas setMascotaSeleccionadaGlobal={setMascotaSeleccionada} />} />
          <Route path="/adopcion" element={<FormularioAdopcion mascota={mascotaSeleccionada} />} />
          <Route path="/mis-solicitudes" element={<MisSolicitudes />} />
          <Route path="/perfil" element={<Perfil />} />

          {/* Rutas de Administrador */}
          <Route path="/admin/dashboard" element={userRole === "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/admin/solicitudes" element={<Solicitudes />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/mascotas" element={<GestionMascotas />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole") || null);
  
  return (
    <Router>
      <AppContent userRole={userRole} setUserRole={setUserRole} />
    </Router>
  );
};

export default App;