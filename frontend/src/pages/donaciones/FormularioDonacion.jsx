import React, { useState } from 'react';
import axios from 'axios';

const FormularioDonacion = () => {
  const [formData, setFormData] = useState({
    donante: '',
    monto: '',
    metodoPago: 'TARJETA'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Conexión con tu nuevo endpoint de Donaciones
      await axios.post('http://localhost:8080/api/donaciones', formData);
      alert("¡Gracias por tu donación! Tu aporte ayuda mucho.");
      setFormData({ donante: '', monto: '', metodoPago: 'TARJETA' });
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al procesar tu donación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Realizar Donación</h3>
      
      <input 
        style={styles.input} placeholder="Tu nombre" 
        value={formData.donante}
        onChange={e => setFormData({...formData, donante: e.target.value})} 
      />
      
      <input 
        style={styles.input} type="number" placeholder="Monto (ej: 50.00)" 
        value={formData.monto}
        onChange={e => setFormData({...formData, monto: e.target.value})} 
      />

      <select 
        style={styles.input} 
        onChange={e => setFormData({...formData, metodoPago: e.target.value})}
      >
        <option value="TARJETA">Tarjeta</option>
        <option value="TRANSFERENCIA">Transferencia</option>
      </select>

      <button type="submit" disabled={loading} style={styles.btn}>
        {loading ? 'Procesando...' : 'Donar Ahora'}
      </button>
    </form>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '15px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #ccc' },
  btn: { padding: '15px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
};

export default FormularioDonacion;