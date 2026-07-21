import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormularioVoluntariado = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: '', // Ajustado a los nombres que espera tu backend
    email: '',
    telefono: '',
    motivacion: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.nombreCompleto.trim()) tempErrors.nombreCompleto = "El nombre es obligatorio.";
    if (!/^\d{9,12}$/.test(formData.telefono)) tempErrors.telefono = "Número inválido (9-12 dígitos).";
    if (formData.motivacion.length < 20) tempErrors.motivacion = "Contanos un poco más (mín. 20 caracteres).";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        // Enpoint corregido para usar el método que creamos en VoluntarioController
        await axios.post('http://localhost:8080/api/voluntarios/solicitud', formData);
        
        alert("¡Solicitud enviada con éxito! Nos pondremos en contacto.");
        navigate('/voluntariado');
      } catch (error) {
        console.error("Error al conectar con la API:", error);
        alert("Hubo un error al enviar tu solicitud. Verifica el servidor.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={{ textAlign: 'center', color: '#0f172a' }}>Unite al equipo</h2>
      
      <input 
        style={styles.input} 
        placeholder="Nombre completo" 
        value={formData.nombreCompleto}
        onChange={e => setFormData({...formData, nombreCompleto: e.target.value})} 
      />
      {errors.nombreCompleto && <p style={styles.error}>{errors.nombreCompleto}</p>}

      <input 
        style={styles.input} 
        placeholder="Email" 
        value={formData.email}
        onChange={e => setFormData({...formData, email: e.target.value})} 
      />

      <input 
        style={styles.input} 
        placeholder="Teléfono (ej: 123456789)" 
        value={formData.telefono}
        onChange={e => setFormData({...formData, telefono: e.target.value})} 
      />
      {errors.telefono && <p style={styles.error}>{errors.telefono}</p>}

      <textarea 
        style={{...styles.input, height: '120px', resize: 'none'}} 
        placeholder="¿Por qué querés ser voluntario? (mín. 20 caracteres)"
        value={formData.motivacion}
        onChange={e => setFormData({...formData, motivacion: e.target.value})}
      />
      {errors.motivacion && <p style={styles.error}>{errors.motivacion}</p>}

      <button 
        type="submit" 
        disabled={loading}
        style={{...styles.btn, opacity: loading ? 0.7 : 1}}
      >
        {loading ? 'Enviando...' : 'Enviar solicitud'}
      </button>
    </form>
  );
};

const styles = {
  form: { 
    display: 'flex', flexDirection: 'column', gap: '15px', 
    maxWidth: '500px', margin: '40px auto', padding: '30px',
    border: '1px solid #e2e8f0', borderRadius: '20px', background: '#ffffff' 
  },
  input: { padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' },
  error: { color: '#ef4444', fontSize: '0.8rem', marginTop: '-10px', marginBottom: '5px' },
  btn: { 
    padding: '15px', background: '#0f172a', color: '#fff', 
    border: 'none', borderRadius: '12px', cursor: 'pointer',
    fontWeight: 'bold', fontSize: '1rem', transition: '0.3s'
  }
};

export default FormularioVoluntariado;