import React, { useState } from 'react';
import { registerService } from '../services/userService';

const Register = () => {
  const [formData, setFormData] = useState({ nombres: '', apellidos: '', email: '', password: '', telefono: '', direccion: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const { nombres, apellidos, email, password, telefono, direccion } = formData;

    if (!nombres || !apellidos || !email || !password || !telefono || !direccion) {
      setError('Todos los campos son obligatorios.'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, ingresa un correo válido con @.'); return;
    }
    if (telefono.length !== 9 || isNaN(telefono)) {
      setError('El teléfono debe tener exactamente 9 números.'); return;
    }

    try {
      await registerService(formData);
      setSuccess('¡Usuario registrado con éxito como ADOPTANTE!');
      setFormData({ nombres: '', apellidos: '', email: '', password: '', telefono: '', direccion: '' });
    } catch (err) { 
      setError('No se pudo conectar con el servidor. Asegúrate de que el Backend esté corriendo.'); 
    }
  };

  // Objetos de estilo CSS moderno en línea
  const styles = {
    card: {
      maxWidth: '450px',
      margin: '50px auto',
      padding: '35px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: '#333333'
    },
    title: {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#1a1a1a',
      fontSize: '24px',
      fontWeight: '600'
    },
    inputGroup: {
      marginBottom: '18px'
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#666666'
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      fontSize: '15px',
      backgroundColor: '#ffffff',
      color: '#333333',
      border: '1px solid #dcdcdc',
      borderRadius: '8px',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
    },
    button: {
      width: '100%',
      padding: '14px',
      marginTop: '10px',
      background: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease, transform 0.1s ease'
    },
    errorAlert: {
      backgroundColor: '#fdf2f2',
      color: '#ec5b5b',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
      border: '1px solid #fbd5d5',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    successAlert: {
      backgroundColor: '#f0fdf4',
      color: '#258750',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
      border: '1px solid #bbf7d0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🐾 Registro CanMartin</h2>
      
      {error && <div style={styles.errorAlert}>⚠️ {error}</div>}
      {success && <div style={styles.successAlert}>✅ {success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Nombres</label>
          <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} style={styles.input} placeholder="Ej. Juan Javier" />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Apellidos</label>
          <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} style={styles.input} placeholder="Ej. Rojas Espinoza" />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Correo Electrónico</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} placeholder="nombre@correo.com" />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Contraseña</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} placeholder="••••••••" />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Teléfono</label>
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} maxLength="9" style={styles.input} placeholder="939655175" />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Dirección de Domicilio</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} style={styles.input} placeholder="Ej. Mz I Lte 13" />
        </div>

        <button type="submit" style={styles.button}>Registrarse</button>
      </form>
    </div>
  );
};

export default Register;