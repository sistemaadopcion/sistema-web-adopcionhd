import React, { useState, useEffect } from 'react';
import { registrarSolicitud, obtenerSolicitudesPorUsuario } from '../../services/adopcionService';

function FormularioAdopcion({ mascota, onVolver }) {
  // Protección: Si no hay mascota, no renderizar
  if (!mascota) return <div style={{ textAlign: 'center', padding: '40px' }}>Cargando datos...</div>;

  const [formData, setFormData] = useState({
    tipoVivienda: 'CASA',
    espacioAdecuado: 'SI',
    otrasMascotas: '',
    motivo: '',
    compromiso: false
  });

  const [bloqueado, setBloqueado] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarPostulacion = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const solicitudes = await obtenerSolicitudesPorUsuario(userId);
          // Usamos optional chaining (?.) para evitar el error si la lista está vacía
          const yaPostulo = solicitudes?.some(s => 
            s.mascota?.id === mascota?.id && s.estadoSolicitud === 'ENVIADA'
          );
          setBloqueado(yaPostulo);
        } catch (error) {
          console.error("Error verificando:", error);
        }
      }
      setCargando(false);
    };
    verificarPostulacion();
  }, [mascota]); // Dependencia actualizada

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.compromiso) {
      alert("Debes aceptar el compromiso de cuidado responsable.");
      return;
    }
    
    const userId = sessionStorage.getItem("userId");
    const solicitudData = {
      ...formData,
      observaciones: formData.otrasMascotas,
      usuario: { id: parseInt(userId) },
      mascota: { id: mascota.id }
    };

    try {
      await registrarSolicitud(solicitudData);
      alert("¡Solicitud enviada exitosamente!");
      onVolver(); 
    } catch (error) {
      alert("Error al enviar la solicitud.");
    }
  };

  if (cargando) return <div style={{ textAlign: 'center', padding: '40px' }}>Verificando disponibilidad...</div>;

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '40px', background: '#ffffff', borderRadius: '30px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
      <h2 style={{ color: '#0f172a', fontSize: '2.5rem', marginBottom: '10px' }}>Adoptar a {mascota.nombre} 🐾</h2>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>Completa el formulario para que el administrador pueda revisar tu solicitud.</p>
      
      {bloqueado ? (
        <div style={{ padding: '30px', background: '#f8fafc', borderRadius: '20px', textAlign: 'center' }}>
          <p style={{ color: '#1e293b', fontWeight: 'bold' }}>Ya has solicitado esta adopción.</p>
          <button onClick={onVolver} style={{ marginTop: '20px', padding: '12px 25px', background: '#0f172a', color: 'white', borderRadius: '12px', cursor: 'pointer', border: 'none' }}>Regresar</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: '600', color: '#475569' }}>
              Tipo de vivienda:
              <select onChange={(e) => setFormData({...formData, tipoVivienda: e.target.value})} style={{ padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <option value="CASA">Casa</option>
                <option value="DEPARTAMENTO">Departamento</option>
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: '600', color: '#475569' }}>
              ¿Tienes espacio adecuado?
              <div style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
                <label><input type="radio" value="SI" checked={formData.espacioAdecuado === "SI"} onChange={(e) => setFormData({...formData, espacioAdecuado: e.target.value})} /> Sí</label>
                <label><input type="radio" value="NO" checked={formData.espacioAdecuado === "NO"} onChange={(e) => setFormData({...formData, espacioAdecuado: e.target.value})} /> No</label>
              </div>
            </label>
          </div>
          
          <textarea placeholder="¿Tienes otras mascotas? Cuéntanos..." onChange={(e) => setFormData({...formData, otrasMascotas: e.target.value})} style={{ padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', minHeight: '80px' }} />
          <textarea placeholder="¿Por qué quieres adoptar a esta mascota?" required onChange={(e) => setFormData({...formData, motivo: e.target.value})} style={{ padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', minHeight: '120px' }} />
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569' }}>
            <input type="checkbox" required onChange={(e) => setFormData({...formData, compromiso: e.target.checked})} />
            Acepto el compromiso de cuidado responsable.
          </label>
          
          <button type="submit" style={{ padding: '20px', background: '#0f172a', color: 'white', borderRadius: '16px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '10px' }}>
            Enviar Solicitud al Administrador
          </button>
        </form>
      )}
    </div>
  );
}

export default FormularioAdopcion;