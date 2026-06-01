import React, { useState } from 'react';

function FormularioAdopcion({ mascota, setView }) {
  const [formData, setFormData] = useState({
    tipoVivienda: 'casa',
    espacioAdecuado: 'sí',
    otrasMascotas: '',
    experiencia: '',
    motivo: '',
    compromiso: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.compromiso) {
      alert("Debes aceptar el compromiso de cuidado responsable.");
      return;
    }
    // Aquí iría tu lógica de conexión con el backend (POST a /solicitudes)
    console.log("Enviando solicitud para:", mascota.nombre, formData);
    
    alert("¡Solicitud enviada correctamente!");
    setView('solicitudes'); // Redirige como pide el issue
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '12px' }}>
      <h2>🐾 Adoptar a {mascota.nombre}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Tipo de vivienda:
          <select onChange={(e) => setFormData({...formData, tipoVivienda: e.target.value})}>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="otro">Otro</option>
          </select>
        </label>
        
        <label>¿Cuenta con espacio adecuado? 
          <input type="radio" name="espacio" value="sí" onChange={(e) => setFormData({...formData, espacioAdecuado: e.target.value})} defaultChecked /> Sí
          <input type="radio" name="espacio" value="no" onChange={(e) => setFormData({...formData, espacioAdecuado: e.target.value})} /> No
        </label>

        <textarea placeholder="Motivo de adopción" required onChange={(e) => setFormData({...formData, motivo: e.target.value})} />
        
        <label>
          <input type="checkbox" required onChange={(e) => setFormData({...formData, compromiso: e.target.checked})} />
          Compromiso de cuidado responsable
        </label>

        <button type="submit" style={{ padding: '10px', background: '#e67e22', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}

export default FormularioAdopcion;