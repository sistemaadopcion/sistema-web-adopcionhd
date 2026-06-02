import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ onLogout, userRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!userRole;

  const getNavOptions = () => {
    if (!isAuthenticated) return [
      { id: 'inicio', label: '🏡 Inicio', path: '/' },
      { id: 'login', label: '🔑 Iniciar Sesión', path: '/login' },
      { id: 'registro', label: '📝 Registrarse', path: '/registro' }
    ];
    if (userRole === 'ADMIN') return [
      { id: 'dashboard', label: '📊 Dashboard', path: '/admin/dashboard' },
      { id: 'gestion-mascotas', label: '🛠️ Mascotas', path: '/admin/mascotas' },
      { id: 'solicitudes', label: '📋 Solicitudes', path: '/admin/solicitudes' },
      { id: 'usuarios', label: '👥 Usuarios', path: '/admin/usuarios' }
    ];
    return [
      { id: 'inicio', label: '🏡 Inicio', path: '/' },
      { id: 'mascotas', label: '🐾 Mascotas', path: '/mascotas' },
      { id: 'mis-solicitudes', label: '💌 Mis Adopciones', path: '/mis-solicitudes' },
      { id: 'perfil', label: '👤 Perfil', path: '/perfil' }
    ];
  };

  const navOptions = getNavOptions();

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const styles = {
    navContainer: {
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      padding: '0 40px',
      height: '70px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      zIndex: 1000,
      fontFamily: "'Inter', sans-serif"
    },
    logo: {
      color: '#fff',
      fontSize: '20px',
      fontWeight: '800',
      cursor: 'pointer',
      letterSpacing: '-0.5px'
    },
    menuDesktop: { display: 'flex', alignItems: 'center', gap: '8px' },
    button: (path) => ({
      background: location.pathname === path ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
      border: 'none',
      color: location.pathname === path ? '#38bdf8' : '#e2e8f0',
      padding: '8px 16px',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease'
    }),
    logoutButton: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '8px 20px',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: '600',
      marginLeft: '16px',
      transition: 'background 0.3s ease'
    },
    hamburger: { display: 'none', flexDirection: 'column', gap: '4px', background: 'transparent', border: 'none', cursor: 'pointer' },
    line: { width: '24px', height: '2px', backgroundColor: '#fff', borderRadius: '2px' }
  };

  return (
    <>
      <nav style={styles.navContainer}>
        <div style={styles.logo} onClick={() => handleNavClick('/')}>🐾 Can Martin</div>

        <div className="nav-desktop" style={styles.menuDesktop}>
          {navOptions.map((opt) => (
            <button key={opt.id} onClick={() => handleNavClick(opt.path)} style={styles.button(opt.path)}>
              {opt.label}
            </button>
          ))}
          {isAuthenticated && <button onClick={onLogout} style={styles.logoutButton}>Salir</button>}
        </div>

        <button className="nav-hamburger" style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <div style={styles.line} /><div style={styles.line} /><div style={styles.line} />
        </button>
      </nav>

      {/* Menú Móvil con estilo mejorado */}
      {isOpen && (
        <div style={{...styles.navContainer, flexDirection: 'column', height: 'auto', padding: '20px', alignItems: 'stretch', gap: '10px'}}>
          {navOptions.map((opt) => (
            <button key={opt.id} onClick={() => handleNavClick(opt.path)} style={{...styles.button(opt.path), textAlign: 'left', width: '100%'}}>
              {opt.label}
            </button>
          ))}
          {isAuthenticated && <button onClick={onLogout} style={{...styles.logoutButton, marginLeft: 0}}>Cerrar sesión</button>}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;