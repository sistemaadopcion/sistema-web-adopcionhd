import React, { useEffect, useState } from 'react';
import { obtenerSolicitudes, actualizarEstadoSolicitud } from '../../services/adopcionService';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  useEffect(() => { cargarSolicitudes(); }, []);

  const cargarSolicitudes = async () => {
    try {
      const data = await obtenerSolicitudes();
      setSolicitudes(data);
    } catch (error) { 
      console.error("Error cargando:", error); 
    }
  };

  const manejarEstado = async (id, nuevoEstado) => {
    try {
      // Nota: Asegúrate que tu servicio envíe el estado correcto
      await actualizarEstadoSolicitud(id, nuevoEstado);
      cargarSolicitudes();
    } catch (error) {
      alert("No se pudo actualizar el estado.");
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto' }}>
      <h1 style={{ color: '#0f172a' }}>📋 Gestión de Solicitudes</h1>
      
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '16px' }}>Adoptante</th>
              <th style={{ padding: '16px' }}>Mascota</th>
              <th style={{ padding: '16px' }}>Estado</th>
              <th style={{ padding: '16px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.length > 0 ? solicitudes.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '16px' }}>{s.usuario?.nombre || 'Sin nombre'}</td>
                <td style={{ padding: '16px' }}>{s.mascota?.nombre || 'Desconocida'}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                    // CORRECCIÓN AQUÍ: Comparar contra ENVIADA y APROBADA
                    background: s.estadoSolicitud === 'ENVIADA' ? '#fef3c7' : (s.estadoSolicitud === 'APROBADA' ? '#dcfce7' : '#fee2e2'),
                    color: s.estadoSolicitud === 'ENVIADA' ? '#92400e' : (s.estadoSolicitud === 'APROBADA' ? '#065f46' : '#991b1b')
                  }}>
                    {s.estadoSolicitud}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <button onClick={() => setSolicitudSeleccionada(s)} style={{ padding: '6px 12px', cursor: 'pointer', marginRight: '8px' }}>👁️ Ver</button>
                  
                  {/* CORRECCIÓN AQUÍ: Mostrar botón solo si está ENVIADA */}
                  {s.estadoSolicitud === 'ENVIADA' && (
                    <button 
                      onClick={() => manejarEstado(s.id, 'APROBADA')} 
                      style={{ background: '#22c55e', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      ✅ Aprobar
                    </button>
                  )}
                </td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No hay solicitudes.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de detalle */}
      {solicitudSeleccionada && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', width: '450px' }}>
            <h2>Detalle de Solicitud</h2>
            <p><strong>Adoptante:</strong> {solicitudSeleccionada.usuario?.nombre}</p>
            <p><strong>Mascota:</strong> {solicitudSeleccionada.mascota?.nombre}</p>
            <p><strong>Vivienda:</strong> {solicitudSeleccionada.tipoVivienda}</p>
            <p><strong>Espacio:</strong> {solicitudSeleccionada.espacioAdecuado}</p>
            <p><strong>Motivo:</strong> {solicitudSeleccionada.motivo}</p>
            <button onClick={() => setSolicitudSeleccionada(null)} style={{ width: '100%', padding: '12px', marginTop: '20px', background: '#e2e8f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Solicitudes;