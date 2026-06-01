import React, { useState } from 'react';

function Navbar({ currentView, setView, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navOptions = [
    { id: 'inicio', label: '🏡 Inicio' },
    { id: 'mascotas', label: '🐾 Mascotas' },
    { id: 'solicitudes', label: '📋 Mis Solicitudes' },
    { id: 'perfil', label: '👤 Perfil' }
  ];

  // Estilos embebidos responsivos inline
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#2c3e50',
    padding: '15px 30px',
    color: 'white',
    fontFamily: "'Segoe UI', sans-serif",
    position: 'relative',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const logoStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const menuStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  };

  const linkStyle = (id) => ({
    background: currentView === id ? '#34495e' : 'none',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: currentView === id ? 'bold' : 'normal',
    transition: 'background 0.3s'
  });

  const logoutButtonStyle = {
    background: '#e74c3c',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600'
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle} onClick={() => setView('inicio')}>
        🐾 Huellitas Digitales
      </div>

      <div style={menuStyle}>
        {navOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setView(option.id)}
            style={linkStyle(option.id)}
          >
            {option.label}
          </button>
        ))}
        <button onClick={onLogout} style={logoutButtonStyle}>
          🚪 Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;