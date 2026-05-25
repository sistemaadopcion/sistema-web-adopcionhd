import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import Mascotas from './components/Mascotas';
import Solicitudes from './components/Solicitudes';
import FormularioAdopcion from './components/FormularioAdopcion'; // 👈 IMPORTANTE: Añade esta línea

function App() {
  const [role, setRole] = useState(() => {
    const savedRole = sessionStorage.getItem('userRole');
    return savedRole ? savedRole.toUpperCase() : null;
  });
  
  const [view, setView] = useState('login'); 
  const [authError, setAuthError] = useState('');
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  const handleLoginSuccess = (userRole) => {
    const finalRole = userRole ? userRole.toUpperCase() : 'ADOPTANTE'; 
    setRole(finalRole);
    setView('inicio'); 
    setAuthError('');
  };

  const handleCerrarSesion = () => {
    sessionStorage.clear();
    localStorage.removeItem('token');
    setRole(null); 
    setView('login'); 
  };
  
  const intentarAccesoForzado = () => {
    setAuthError('❌ ACCESO DENEGADO: No tienes permisos de Administrador.');
  };

  const renderContent = () => {
    switch (view) {
      case 'inicio':
        return (
          <div>
            {role === 'ADMIN' ? (
              <div style={{ backgroundColor: '#fff3cd', padding: '40px', borderRadius: '12px', border: '1px solid #ffeeba', maxWidth: '600px', margin: '0 auto' }}>
                <h1>👑 Panel Administrativo</h1>
                <p>🔑 Sesión: Administrador General del Albergue</p>
              </div>
            ) : (
              <div style={{ backgroundColor: '#e2f0d9', padding: '40px', borderRadius: '12px', border: '1px solid #c5e1a5', maxWidth: '600px', margin: '0 auto' }}>
                <h1>🐾 Vista Principal de Adoptantes</h1>
                <p>Bienvenido a Huellitas Digitales.</p>
                <button onClick={intentarAccesoForzado} style={{ marginTop: '20px', padding: '8px 16px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  Probar ingresar al Panel Admin
                </button>
              </div>
            )}
            <div style={{ marginTop: '30px' }}>
              <Home setView={setView} />
            </div>
          </div>
        );
      case 'mascotas':
        return (
          <Mascotas 
            setView={setView} 
            setMascotaSeleccionadaGlobal={setMascotaSeleccionada}
          />
        );
      case 'solicitudes':
        return <Solicitudes />;  
      case 'formulario':
        // Aquí recibimos la mascota seleccionada y la pasamos al formulario
        return <FormularioAdopcion mascota={mascotaSeleccionada} setView={setView} />; 
      case 'perfil':
        return (
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '700px', margin: '0 auto' }}>
            <h2>👤 Configuración de Perfil</h2>
          </div>
        );
      default:
        return <Home setView={setView} />;
    }
  };

  if (role) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
        <Navbar currentView={view} setView={setView} onLogout={handleCerrarSesion} />
        <div style={{ padding: '40px', textAlign: 'center' }}>
          {authError && (
            <div style={{ backgroundColor: '#fdf2f2', color: '#ec5b5b', padding: '15px', borderRadius: '8px', border: '1px solid #fbd5d5', maxWidth: '600px', margin: '0 auto 20px auto', fontWeight: 'bold' }}>
              {authError}
            </div>
          )}
          {renderContent()}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f9', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
          <button onClick={() => setView('login')} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', fontWeight: view === 'login' ? 'bold' : 'normal' }}>Ir al Login</button>
          <button onClick={() => setView('register')} style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', fontWeight: view === 'register' ? 'bold' : 'normal' }}>Registrarse</button>
        </div>
        {view === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
        {view === 'register' && <Register />}
      </div>
    </div>
  );
}

export default App;