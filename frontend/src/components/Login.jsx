import React, { useState } from 'react';
import { loginService } from '../services/userService';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Criterio: Validación de campos obligatorios en el Frontend
    if (!formData.email || !formData.password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const user = await loginService(formData);

      // 🛡️ Guardamos el rol forzándolo a MAYÚSCULAS para evitar fallas de formato (ej: 'Admin' -> 'ADMIN')
      const formatoRol = user.rol ? user.rol.toUpperCase() : 'ADOPTANTE';

      sessionStorage.setItem('userRole', formatoRol);
      sessionStorage.setItem('userName', user.nombre);
      
     // Notificamos a la App con el rol estandarizado
      onLoginSuccess(formatoRol);
    } catch (err) {
      // Criterio: Manejo de errores (Usuario no existe / Credenciales incorrectas)
      setError(err.message || 'Error al conectar con el servidor.');
    }
  };

  const styles = {
    card: {
      maxWidth: '400px',
      margin: '80px auto',
      padding: '35px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      color: '#333333'
    },
    title: { textAlign: 'center', marginBottom: '25px', color: '#1a1a1a', fontWeight: '600' },
    inputGroup: { marginBottom: '18px' },
    label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#666666' },
    input: { width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid #dcdcdc', borderRadius: '8px', boxSizing: 'border-box' },
    button: { width: '100%', padding: '14px', marginTop: '10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
    errorAlert: { backgroundColor: '#fdf2f2', color: '#ec5b5b', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', border: '1px solid #fbd5d5' }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🔐 Iniciar Sesión</h2>
      
      {error && <div style={styles.errorAlert}>⚠️ {error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Correo Electrónico</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} placeholder="nombre@correo.com" />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Contraseña</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} placeholder="••••••••" />
        </div>

        <button type="submit" style={styles.button}>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;