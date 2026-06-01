import React, { useState } from 'react';

function Navbar({ currentView, setView, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navOptions = [
    { id: 'inicio', label: '🏡 Inicio' },
    { id: 'mascotas', label: '🐾 Mascotas' },
    { id: 'solicitudes', label: '📋 Mis Solicitudes' },
    { id: 'perfil', label: '👤 Perfil' }
  ];

  const handleNavClick = (id) => {
    setView(id);
    setIsOpen(false);
  };

  const styles = {
    navContainer: {
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '0 24px',
      height: '70px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },
    logo: {
      color: '#f8fafc',
      fontSize: '22px',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      letterSpacing: '0.5px'
    },
    menuDesktop: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    button: (id) => ({
      background: currentView === id ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
      border: 'none',
      color: currentView === id ? '#38bdf8' : '#cbd5e1',
      padding: '10px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.25s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }),
    logoutButton: {
      background: '#ef4444',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
      transition: 'all 0.25s ease',
      marginLeft: '12px'
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column',
      gap: '5px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px'
    },
    line: {
      width: '25px',
      height: '3px',
      backgroundColor: '#f8fafc',
      borderRadius: '2px',
      transition: 'all 0.3s ease'
    },
    menuMobile: {
      position: 'absolute',
      top: '70px',
      left: 0,
      right: 0,
      background: '#1e293b',
      padding: '16px 24px',
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
      zIndex: 999
    }
  };

  return (
    <>
      <nav style={styles.navContainer}>
        <div style={styles.logo} onClick={() => handleNavClick('inicio')}>
          <span style={{ fontSize: '24px' }}>🐾</span> Huellitas Digitales
        </div>

        <div className="nav-desktop" style={styles.menuDesktop}>
          {navOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleNavClick(option.id)}
              style={styles.button(option.id)}
            >
              {option.label}
            </button>
          ))}
          
          {/* 🚀 Botón integrado con estilos existentes */}
          <button 
            onClick={onLogout} 
            style={styles.logoutButton}
            onMouseEnter={(e) => e.target.style.background = '#dc2626'}
            onMouseLeave={(e) => e.target.style.background = '#ef4444'}
          >
            Cerrar sesión
          </button>
        </div>

        <button 
          className="nav-hamburger" 
          style={styles.hamburger} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div style={{...styles.line, transform: isOpen ? 'rotate(45deg) translate(6px, 5px)' : 'none'}} />
          <div style={{...styles.line, opacity: isOpen ? 0 : 1}} />
          <div style={{...styles.line, transform: isOpen ? 'rotate(-45deg) translate(6px, -5px)' : 'none'}} />
        </button>
      </nav>

      <div style={styles.menuMobile}>
        {navOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleNavClick(option.id)}
            style={{...styles.button(option.id), width: '100%', justifyContent: 'flex-start'}}
          >
            {option.label}
          </button>
        ))}
        {/* 🚀 Botón móvil integrado */}
        <button onClick={onLogout} style={{...styles.logoutButton, marginLeft: 0, width: '100%'}}>
          🚪 Cerrar sesión
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;