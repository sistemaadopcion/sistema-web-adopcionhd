import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ListaAdmin from "./pages/admin/ListaAdmin"; 
import Donaciones from "./pages/donaciones/Donaciones"; 
import Voluntariado from "./pages/voluntariado/Voluntariado";
import PagarDonacion from "./pages/donaciones/PagarDonacion";
import FormularioVoluntariado from "./pages/voluntariado/FormularioVoluntariado";

// Layout y Componentes
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GestionVoluntariado from "./pages/admin/GestionVoluntariado";

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
import VoluntariosAdmin from "./pages/admin/VoluntariosAdmin";
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
    <div className="min-h-screen flex flex-col">
      <Navbar userRole={userRole} onLogout={handleLogout} />
      
      <main className="flex-grow">
       <Routes>
  <Route path="/" element={userRole ? (<Navigate to={userRole === "ADMIN" ? "/admin/dashboard" : "/dashboard"} />) : (<Home />)} />
  
  {/* Rutas Públicas */}
  <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
  <Route path="/registro" element={<Register />} />
  <Route path="/donaciones" element={<Donaciones />} />
  <Route path="/donaciones/pagar" element={<PagarDonacion />} />
  
  {/* Ruta del Formulario de Voluntariado */}
  <Route path="/voluntariado" element={<FormularioVoluntariado />} />

  {/* Rutas de Usuario */}
  <Route path="/dashboard" element={userRole ? <DashboardUsuario /> : <Navigate to="/login" />} />
  <Route path="/mascotas" element={<Mascotas setMascotaSeleccionadaGlobal={setMascotaSeleccionada} />} />
  
  {/* RUTA CORREGIDA: Ahora acepta el idMascota dinámico en la URL */}
  <Route path="/adopcion/:idMascota" element={userRole ? <FormularioAdopcion /> : <Navigate to="/login" />} />
  
  <Route path="/mis-solicitudes" element={userRole ? <MisSolicitudes /> : <Navigate to="/login" />} />
  <Route path="/perfil" element={userRole ? <Perfil /> : <Navigate to="/login" />} />

  {/* Rutas de Administrador */}
  <Route path="/admin/dashboard" element={userRole === "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />} />
  <Route path="/admin/solicitudes" element={userRole === "ADMIN" ? <Solicitudes /> : <Navigate to="/" />} />
  <Route path="/admin/usuarios" element={userRole === "ADMIN" ? <Usuarios /> : <Navigate to="/" />} />
  <Route path="/admin/mascotas" element={userRole === "ADMIN" ? <GestionMascotas /> : <Navigate to="/" />} />
  <Route path="/admin/donaciones" element={<ListaAdmin tipo="donaciones" />} />
  <Route path="/admin/voluntarios" element={<ListaAdmin tipo="voluntarios" />} />
  
  <Route path="/admin/gestion-voluntarios" element={userRole === "ADMIN" ? <GestionVoluntariado /> : <Navigate to="/" />} />

  <Route path="*" element={<Navigate to="/" />} />

  <Route
  path="/admin/voluntarios"
  element={<VoluntariosAdmin />}
/>
</Routes>
      </main>

      <Footer />
    </div>
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