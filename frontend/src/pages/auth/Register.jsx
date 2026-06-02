import React, { useState } from 'react';
import { registerService } from "../../services/userService";

const Register = () => {
  // Ajustado: Nombres de claves idénticos a Usuario.java
  const [formData, setFormData] = useState({ 
    nombre: '', 
    apellido: '', 
    correo: '',       // Corregido
    contrasena: '',   // Corregido
    telefono: '', 
    direccion: '' 
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess('');
    
    // Desestructuramos usando los nombres correctos
    const { nombre, apellido, correo, contrasena, telefono, direccion } = formData;

    if (!nombre || !apellido || !correo || !contrasena || !telefono || !direccion) {
      setError('Todos los campos son obligatorios.'); 
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setError('Por favor, ingresa un correo válido.'); 
      return;
    }
    if (telefono.length !== 9 || isNaN(telefono)) {
      setError('El teléfono debe tener exactamente 9 números.'); 
      return;
    }

    try {
      await registerService(formData);
      setSuccess('¡Usuario registrado con éxito!');
      setFormData({ nombre: '', apellido: '', correo: '', contrasena: '', telefono: '', direccion: '' });
    } catch (err) { 
      setError('Error al registrar. Revisa los datos o el servidor.'); 
    }
  };

  const styles = {
    card: { maxWidth: '450px', margin: '50px auto', padding: '35px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)', fontFamily: "'Segoe UI', sans-serif" },
    title: { textAlign: 'center', marginBottom: '25px', color: '#1a1a1a', fontSize: '24px', fontWeight: '600' },
    inputGroup: { marginBottom: '18px' },
    label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#666666' },
    input: { width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid #dcdcdc', borderRadius: '8px', boxSizing: 'border-box' },
     button: {
      width: "100%", padding: "14px", marginTop: "10px", background: "#0f172a", color: "white",
      border: "none", borderRadius: "12px", fontSize: "1rem", fontWeight: "600", cursor: "pointer",
      transition: "background 0.3s ease"
    },
    errorAlert: { backgroundColor: '#fdf2f2', color: '#ec5b5b', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' },
    successAlert: { backgroundColor: '#f0fdf4', color: '#258750', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🐾 Registro CanMartin</h2>
      {error && <div style={styles.errorAlert}>⚠️ {error}</div>}
      {success && <div style={styles.successAlert}>✅ {success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Nombres</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} style={styles.input} placeholder="Ej. Juan" />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Apellidos</label>
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} style={styles.input} placeholder="Ej. Rojas" />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Correo Electrónico</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Contraseña</label>
          <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Teléfono</label>
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} maxLength="9" style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Dirección</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Registrarse</button>
      </form>
    </div>
  );
};

export default Register;