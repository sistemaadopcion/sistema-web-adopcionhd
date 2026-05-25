import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import Mascotas from './components/Mascotas'; // 👈 Importamos tu Issue #6
import Solicitudes from './components/Solicitudes';

function App() {
  // 🛡️ MODIFICACIÓN 1: Forzamos a MAYÚSCULAS el rol al recuperar del almacenamiento local
  const [role, setRole] = useState(() => {
    const savedRole = sessionStorage.getItem('userRole');
    return savedRole ? savedRole.toUpperCase() : null;
  });
  
  const [view, setView] = useState('login'); 
  const [authError, setAuthError] = useState('');

  // 🛡️ MODIFICACIÓN 2: Estandarizamos el rol entrante del Login a MAYÚSCULAS
  const handleLoginSuccess = (userRole) => {
    const finalRole = userRole ? userRole.toUpperCase() : 'ADOPTANTE'; 
    setRole(finalRole);
    setView('inicio'); 
    setAuthError('');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setRole(null);
    setView('login');
    setAuthError('');
  };

  const intentarAccesoForzado = () => {
    setAuthError('❌ ACCESO DENEGADO: No tienes permisos de Administrador.');
  };

  const [currentSection, setCurrentSection] = useState('inicio');
  // 🏛️ RENDERING DINÁMICO INTEGRADO CON TUS COMPONENTES REALES
  const renderContent = () => {
    switch (view) {
      case 'inicio':
        return (
          <div>
            {/* 👑 Ahora sí coincidirá perfectamente con 'ADMIN' aunque venga 'Admin' de la BD */}
            {role === 'ADMIN' ? (
              <div style={{ backgroundColor: '#fff3cd', padding: '40px', borderRadius: '12px', border: '1px solid #ffeeba', maxWidth: '600px', margin: '0 auto' }}>
                <h1>👑 Panel Administrativo</h1>
                <p>🔑 Sesión: Administrador General del Albergue</p>
              </div>
            ) : (
              <div style={{ backgroundColor: '#e2f0d9', padding: '40px', borderRadius: '12px', border: '1px solid #c5e1a5', maxWidth: '600px', margin: '0 auto' }}>
                <h1>🐾 Vista Principal de Adoptantes</h1>
                <p>Bienvenido a Huellitas Digitales. Usa la barra superior para explorar.</p>
                <button onClick={intentarAccesoForzado} style={{ marginTop: '20px', padding: '8px 16px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  Probar ingresar al Panel Admin
                </button>
              </div>
            )}
            {/* 👈 INYECCIÓN DE LA HOME (ISSUE #5) */}
            <div style={{ marginTop: '30px' }}>
              <Home setView={setView} />
            </div>
          </div>
        );
        const renderSection = () => {
    switch (currentSection) {
      case 'mascotas':
        return <Mascotas />;
      case 'solicitudes': // 👈 Este string debe activarse cuando presionas "Mis Solicitudes" en el menú
        return <Solicitudes />;
      case 'perfil':
        return <div style={{ padding: '20px' }}>Vista Perfil (En construcción)</div>;
      default:
        return <Inicio />;
      }
     };
      case 'mascotas':
        return <Mascotas />;
      case 'solicitudes':
        return <Solicitudes />;   
      case 'perfil':
        return (
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '700px', margin: '0 auto' }}>
            <h2>👤 Configuración de Perfil</h2>
            <p>Gestiona tus datos personales y credenciales de contacto.</p>
          </div>
        );
      default:
        return <Home setView={setView} />;
    }
  };
  

  // VISTA 1: SI EL USUARIO YA INICIÓ SESIÓN (Muestra la barra de navegación y paneles privados)
  if (role) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
        <Navbar currentView={view} setView={setView} onLogout={handleLogout} />

        <div style={{ padding: '40px', textAlign: 'center' }}>
          {authError && (
            <div style={{ backgroundColor: '#fdf2f2', color: '#ec5b5b', padding: '15px', borderRadius: '8px', border: '1px solid #fbd5d5', maxWidth: '600px', margin: '0 auto 20px auto', fontWeight: 'bold' }}>
              {authError}
            </div>
          )}

          {/* Ejecutamos el renderizador dinámico */}
          {renderContent()}
        </div>
      </div>
    );
  }

  // VISTA 2: VISTA PÚBLICA (LOGIN / REGISTRO)
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f9', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <button onClick={() => setView('login')} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', fontWeight: view === 'login' ? 'bold' : 'normal', textDecoration: view === 'login' ? 'underline' : 'none' }}>Ir al Login</button>
        <button onClick={() => setView('register')} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', fontWeight: view === 'register' ? 'bold' : 'normal', textDecoration: view === 'register' ? 'underline' : 'none' }}>¿No tienes cuenta? Regístrate</button>
      </div>

      {/* 🔐 Control explícito */}
      {view === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
      {view === 'register' && <Register />}
    </div>
  );

  return (
    <div>
      {/* Tu Header / Navbar que cambia el estado actual de la sección */}
      {renderSection()}
    </div>
  );

}

export default App;