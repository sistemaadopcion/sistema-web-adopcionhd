import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ onLogout, userRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!userRole;

  const navOptions = !isAuthenticated 
    ? [
        { label: 'Inicio', path: '/' },
        { label: 'Iniciar Sesión', path: '/login' },
        { label: 'Registrarse', path: '/registro' }
      ]
    : userRole === 'ADMIN' 
    ? [
        { label: 'Dashboard', path: '/admin/dashboard' },
        { label: 'Mascotas', path: '/admin/mascotas' },
        { label: 'Solicitudes', path: '/admin/solicitudes' }
      ]
    : [
        { label: 'Inicio', path: '/' },
        { label: 'Mascotas', path: '/mascotas' },
        { label: 'Mis Solicitudes', path: '/mis-solicitudes' },
        { label: 'Perfil', path: '/perfil' }
      ];

  return (
    <nav className="fixed top-0 w-full z-[1000] bg-surface/80 backdrop-blur-md border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')} 
          className="text-2xl font-bold text-primary cursor-pointer flex items-center gap-2"
        >
          🐾 <span className="hidden md:inline">Can Martin</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => navigate(opt.path)}
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                location.pathname === opt.path 
                ? 'bg-primary text-on-primary' 
                : 'text-secondary hover:bg-surface-container-high'
              }`}
            >
              {opt.label}
            </button>
          ))}
          {isAuthenticated && (
            <button onClick={onLogout} className="ml-4 px-5 py-2 rounded-full bg-error-container text-error font-semibold hover:bg-error-container/80 transition-all">
              Salir
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 w-full bg-white border-b p-6 flex flex-col gap-4 shadow-xl">
          {navOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => { navigate(opt.path); setIsOpen(false); }}
              className="text-left font-semibold text-secondary py-2"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;