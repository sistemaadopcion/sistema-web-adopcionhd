import React, { useEffect, useState } from 'react';
import { obtenerSolicitudesPorUsuario } from '../../services/adopcionService';

function MisSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      obtenerSolicitudesPorUsuario(userId).then(setSolicitudes).catch(console.error);
    }
  }, []);

  const getEstiloEstado = (estado) => {
    if (estado === 'APROBADO') return { background: '#dcfce7', color: '#166534' };
    if (estado === 'RECHAZADO') return { background: '#fee2e2', color: '#991b1b' };
    return { background: '#fef3c7', color: '#92400e' };
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
      <h1>📋 Mi Historial de Adopciones</h1>
      {solicitudes.length === 0 ? <p>No tienes solicitudes activas.</p> : (
        solicitudes.map(s => (
          <div key={s.id} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>{s.mascota?.nombre}</h3>
              <p>Motivo: {s.motivo}</p>
            </div>
            <span style={{ padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', ...getEstiloEstado(s.estadoSolicitud) }}>
              {s.estadoSolicitud}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default MisSolicitudes;