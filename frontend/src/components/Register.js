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
    } catch (err) { setError(err.message); }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2>Registro - Huellitas Digitales</h2>
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}
      {success && <p style={{ color: 'green' }}>✅ {success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '6px' }} />
        <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '6px' }} />
        <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '6px' }} />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} style={{ width: '100%', marginBottom: '10px', padding: '6px' }} />
        <input type="text" name="telefono" placeholder="Teléfono (9 dígitos)" value={formData.telefono} onChange={handleChange} maxLength="9" style={{ width: '100%', marginBottom: '10px', padding: '6px' }} />
        <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} style={{ width: '100%', marginBottom: '15px', padding: '6px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Registrarse</button>
      </form>
    </div>
  );
};

export default Register;