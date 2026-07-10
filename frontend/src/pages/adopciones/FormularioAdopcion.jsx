import React, { useState, useEffect } from 'react';
import { registrarSolicitud, obtenerSolicitudesPorUsuario } from '../../services/adopcionService';

function FormularioAdopcion({ mascota, onVolver }) {
  const [formData, setFormData] = useState({
    tipoVivienda: 'CASA',
    espacioAdecuado: 'SI',
    otrasMascotas: '',
    motivo: '',
    compromiso: false
  });

  const [bloqueado, setBloqueado] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Validar si el usuario ya envió una solicitud para esta mascota al cargar
  useEffect(() => {
    const verificarPostulacion = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const solicitudes = await obtenerSolicitudesPorUsuario(userId);
          const yaPostulo = solicitudes.some(s => 
            s.mascota.id === mascota.id && s.estadoSolicitud === 'ENVIADA'
          );
          setBloqueado(yaPostulo);
        } catch (error) {
          console.error("Error verificando postulaciones:", error);
        }
      }
      setCargando(false);
    };
    verificarPostulacion();
  }, [mascota.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bloqueado) return;

    if (!formData.compromiso) {
      alert("Debes aceptar el compromiso de cuidado responsable.");
      return;
    }
    
    const userId = sessionStorage.getItem("userId");
    const solicitudData = {
      tipoVivienda: formData.tipoVivienda,
      espacioAdecuado: formData.espacioAdecuado,
      motivo: formData.motivo,
      observaciones: formData.otrasMascotas,
      usuario: { id: parseInt(userId) },
      mascota: { id: mascota.id }
    };

    try {
      await registrarSolicitud(solicitudData);
      alert("¡Solicitud enviada correctamente!");
      onVolver(); 
    } catch (error) {
      if (error.message.includes("409") || error.message.includes("Ya tienes")) {
        alert("Ya tienes una solicitud enviada para esta mascota. Espera a que sea revisada.");
      } else {
        alert("Error al enviar la solicitud. Verifica que la mascota esté disponible.");
      }
    }
  };

  if (cargando) return <div style={{ textAlign: 'center', padding: '40px' }}>Cargando disponibilidad...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '40px', background: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '2rem' }}>Adoptar a {mascota?.nombre} 🐾</h2>
      
      {bloqueado ? (
        <div style={{ padding: '20px', background: '#fef3c7', color: '#92400e', borderRadius: '12px', textAlign: 'center', marginTop: '20px' }}>
          <p><strong>¡Ya has enviado una solicitud para {mascota?.nombre}!</strong></p>
          <p>Por favor, espera a que el administrador revise tu postulación.</p>
          <button onClick={onVolver} style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer', borderRadius: '8px', border: 'none', background: '#e2e8f0' }}>Volver</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155', fontWeight: '600' }}>
              Tipo de vivienda:
              <select value={formData.tipoVivienda} onChange={(e) => setFormData({ ...formData, tipoVivienda: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <option value="CASA">Casa</option>
                <option value="DEPARTAMENTO">Departamento</option>
                <option value="OTRO">Otro</option>
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155', fontWeight: '600' }}>
              ¿Tiene espacio adecuado?
              <div style={{ display: 'flex', gap: '15px', paddingTop: '10px' }}>
                <label><input type="radio" name="espacio" value="SI" checked={formData.espacioAdecuado === "SI"} onChange={(e) => setFormData({ ...formData, espacioAdecuado: e.target.value })} /> Sí</label>
                <label><input type="radio" name="espacio" value="NO" checked={formData.espacioAdecuado === "NO"} onChange={(e) => setFormData({ ...formData, espacioAdecuado: e.target.value })} /> No</label>
              </div>
            </label>
          </div>
          <textarea placeholder="¿Tienes otras mascotas actualmente?" value={formData.otrasMascotas} onChange={(e) => setFormData({ ...formData, otrasMascotas: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '80px' }} />
          <textarea placeholder="Motivo de adopción" required value={formData.motivo} onChange={(e) => setFormData({ ...formData, motivo: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', minHeight: '100px' }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontSize: '0.95rem' }}>
            <input type="checkbox" checked={formData.compromiso} onChange={(e) => setFormData({ ...formData, compromiso: e.target.checked })} />
            Acepto el compromiso de cuidado responsable.
          </label>
          <button type="submit" style={{ padding: '15px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
            Enviar Solicitud
          </button>
        </form>
      )}
    </div>
  );
}

export default FormularioAdopcion;