import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar'; // 👈 Importamos tu nuevo Navbar
import Home from './components/Home';

function App() {
  const [role, setRole] = useState(sessionStorage.getItem('userRole') || null);
  const [view, setView] = useState('login'); // Controla la sección actual
  const [authError, setAuthError] = useState('');

  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
    setView('inicio'); // Al loguearse con éxito, lo mandamos a 'inicio'
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

  // Ejemplo de cómo estructurar la sección de contenido de tu App.jsx
const renderContent = () => {
  switch (currentView) {
    case 'inicio':
      return <Home setView={setView} />; // 👈 Aquí se inyecta la Issue #5
    case 'mascotas':
      return <div>🐾 Catálogo de Mascotas en construcción...</div>;
    case 'solicitudes':
      return <div>📋 Sección de solicitudes...</div>;
    case 'perfil':
      return <div>👤 Perfil de Usuario...</div>;
    default:
      return <Home setView={setView} />;
  }
};

  // VISTA SI EL USUARIO YA INICIÓ SESIÓN (Muestra la barra de navegación)
  if (role) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
        
        {/* CRITERIO: Barra de navegación funcional e integrada */}
        <Navbar currentView={view} setView={setView} onLogout={handleLogout} />

        <div style={{ padding: '40px', textAlign: 'center' }}>
          {authError && (
            <div style={{ backgroundColor: '#fdf2f2', color: '#ec5b5b', padding: '15px', borderRadius: '8px', border: '1px solid #fbd5d5', maxWidth: '600px', margin: '0 auto 20px auto', fontWeight: 'bold' }}>
              {authError}
            </div>
          )}

          {/* RENDERING DINÁMICO SEGÚN LA OPCIÓN SELECCIONADA EN EL NAVBAR */}
          {view === 'inicio' && (
            <div>
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
            </div>
          )}

          {view === 'mascotas' && (
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '700px', margin: '0 auto' }}>
              <h2>🐾 Catálogo de Mascotas en Adopción</h2>
              <p>Aquí se listará la galería de perritos y gatitos rescatados listos para un hogar.</p>
            </div>
          )}

          {view === 'solicitudes' && (
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '700px', margin: '0 auto' }}>
              <h2>📋 Estado de mis Solicitudes</h2>
              <p>Hitos de tus procesos de adopción en evaluación.</p>
            </div>
          )}

          {view === 'perfil' && (
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '700px', margin: '0 auto' }}>
              <h2>👤 Configuración de Perfil</h2>
              <p>Gestiona tus datos personales y credenciales de contacto.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // VISTA PÚBLICA (LOGIN / REGISTRO)
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f9', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <button onClick={() => setView('login')} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', fontWeight: view === 'login' ? 'bold' : 'normal', textDecoration: 'underline' }}>Ir al Login</button>
        <button onClick={() => setView('register')} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', fontWeight: view === 'register' ? 'bold' : 'normal', textDecoration: 'underline' }}>¿No tienes cuenta? Regístrate</button>
      </div>

      {view === 'login' ? <Login onLoginSuccess={handleLoginSuccess} /> : <Register />}
    </div>
  );
}

export default App;