import React, { useEffect, useState } from 'react';
import { obtenerSolicitudes, actualizarEstadoSolicitud } from '../../services/adopcionService';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filtro, setFiltro] = useState('ENVIADA'); // ENVIADA, APROBADA, RECHAZADA
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  useEffect(() => { cargarSolicitudes(); }, []);

  const cargarSolicitudes = async () => {
    try {
      const data = await obtenerSolicitudes();
      setSolicitudes(data);
    } catch (error) { console.error("Error:", error); }
  };

  const manejarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarEstadoSolicitud(id, nuevoEstado);
      cargarSolicitudes();
      setSolicitudSeleccionada(null);
    } catch (error) { alert("Error al procesar: " + error.message); }
  };

  // Filtrar solicitudes según la pestaña activa
  const solicitudesFiltradas = solicitudes.filter(s => s.estadoSolicitud === filtro);

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: 'auto' }}>
      <h1 style={{ color: '#0f172a', marginBottom: '20px' }}>📋 Gestión de Solicitudes</h1>

      {/* Pestañas de Navegación */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['ENVIADA', 'APROBADA', 'RECHAZADA'].map((estado) => (
          <button 
            key={estado}
            onClick={() => setFiltro(estado)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              background: filtro === estado ? '#0f172a' : '#e2e8f0',
              color: filtro === estado ? 'white' : '#475569',
              fontWeight: 'bold'
            }}
          >
            {estado === 'ENVIADA' ? 'Pendientes' : estado}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #f1f5f9' }}>
              <th style={{ padding: '16px', textAlign: 'left' }}>Adoptante</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Mascota</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesFiltradas.length > 0 ? solicitudesFiltradas.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px' }}>{s.usuario?.nombre} {s.usuario?.apellido}</td>
                <td style={{ padding: '16px' }}>{s.mascota?.nombre}</td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <button onClick={() => setSolicitudSeleccionada(s)} style={{ padding: '8px 16px', cursor: 'pointer', background: '#f1f5f9', border: 'none', borderRadius: '6px' }}>👁️ Ver Detalle</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="3" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No hay solicitudes en este estado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Profesional */}
      {solicitudSeleccionada && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', width: '400px' }}>
            <h2>Detalle de {solicitudSeleccionada.mascota?.nombre}</h2>
            <p><strong>Vivienda:</strong> {solicitudSeleccionada.tipoVivienda}</p>
            <p><strong>Motivo:</strong> {solicitudSeleccionada.motivo}</p>
            
            {solicitudSeleccionada.estadoSolicitud === 'ENVIADA' && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => manejarEstado(solicitudSeleccionada.id, 'APROBADA')} style={{ flex: 1, padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px' }}>Aprobar</button>
                <button onClick={() => manejarEstado(solicitudSeleccionada.id, 'RECHAZADA')} style={{ flex: 1, padding: '12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px' }}>Rechazar</button>
              </div>
            )}
            <button onClick={() => setSolicitudSeleccionada(null)} style={{ width: '100%', marginTop: '10px', padding: '10px', background: 'none', border: '1px solid #cbd5e1', borderRadius: '8px' }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Solicitudes;