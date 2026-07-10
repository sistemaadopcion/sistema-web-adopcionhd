import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout y Componentes
import Navbar from "./components/layout/Navbar";

// Páginas de Autenticación
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Páginas de Adoptante
import Home from "./pages/Home";
import Mascotas from "./pages/mascotas/Mascotas";
import FormularioAdopcion from "./pages/adopciones/FormularioAdopcion";
import MisSolicitudes from "./pages/adopciones/MisSolicitudes";
import Perfil from "./pages/adopciones/Perfil";
import DashboardUsuario from "./pages/adopciones/DashboardUsuario";

// Páginas de Administrador
import Solicitudes from "./pages/admin/Solicitudes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Usuarios from "./pages/admin/Usuarios";
import GestionMascotas from './pages/admin/GestionMascotas';

const AppContent = ({ userRole, setUserRole }) => {
  // Estado global para gestionar la mascota seleccionada para adopción
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
      
      {/* Margen superior para el Navbar fijo */}
      <div className="main-content pt-20">
        <Routes>
          {/* Ruta Raíz: Redirección inteligente basada en rol */}
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
          
          {/* Rutas de Adoptante (Protegidas por rol) */}
          <Route path="/dashboard" element={userRole ? <DashboardUsuario /> : <Navigate to="/login" />} />
          <Route path="/mascotas" element={<Mascotas setMascotaSeleccionadaGlobal={setMascotaSeleccionada} />} />
          <Route path="/adopcion" element={userRole ? <FormularioAdopcion mascota={mascotaSeleccionada} /> : <Navigate to="/login" />} />
          <Route path="/mis-solicitudes" element={userRole ? <MisSolicitudes /> : <Navigate to="/login" />} />
          <Route path="/perfil" element={userRole ? <Perfil /> : <Navigate to="/login" />} />

          {/* Rutas de Administrador (Protegidas por rol) */}
          <Route path="/admin/dashboard" element={userRole === "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/admin/solicitudes" element={userRole === "ADMIN" ? <Solicitudes /> : <Navigate to="/" />} />
          <Route path="/admin/usuarios" element={userRole === "ADMIN" ? <Usuarios /> : <Navigate to="/" />} />
          <Route path="/admin/mascotas" element={userRole === "ADMIN" ? <GestionMascotas /> : <Navigate to="/" />} />
          
          {/* Fallback en caso de rutas inexistentes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  // Inicializamos el rol desde sessionStorage para persistencia al recargar
  const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole") || null);
  
  return (
    <Router>
      <AppContent userRole={userRole} setUserRole={setUserRole} />
    </Router>
  );
};

export default App;