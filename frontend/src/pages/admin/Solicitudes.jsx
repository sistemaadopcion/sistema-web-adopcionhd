import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { obtenerSolicitudes, actualizarEstadoSolicitud } from '../../services/adopcionService';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filtro, setFiltro] = useState('ENVIADA');
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      const data = await obtenerSolicitudes();
      setSolicitudes(data);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

  const generarReporte = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte General de Solicitudes", 14, 22);
    doc.setFontSize(10);
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableColumn = ["Adoptante", "Mascota", "Vivienda", "Estado"];
    const tableRows = solicitudes.map(s => [
      s.usuario?.nombre || "N/A",
      s.mascota?.nombre || "N/A",
      s.tipoVivienda || "N/A",
      s.estadoSolicitud || "N/A"
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      headStyles: { fillColor: [15, 23, 42] }
    });

    doc.save("reporte_solicitudes.pdf");
  };

  const manejarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarEstadoSolicitud(id, nuevoEstado);
      await cargarSolicitudes();
      setSolicitudSeleccionada(null);
    } catch (error) {
      alert("Error al procesar: " + error.message);
    }
  };

  const getBadgeStyle = (estado) => {
    const base = { padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' };
    if (estado === 'ENVIADA') return { ...base, background: '#fef3c7', color: '#92400e' };
    if (estado === 'APROBADA') return { ...base, background: '#dcfce7', color: '#166534' };
    return { ...base, background: '#fee2e2', color: '#991b1b' };
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: '#0f172a', fontSize: '2rem', margin: '0' }}>📋 Gestión de Solicitudes</h1>
          <p style={{ color: '#64748b' }}>Administra y revisa las peticiones de adopción.</p>
        </div>
        <button 
          onClick={generarReporte}
          style={{ background: '#0f172a', color: 'white', padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📥 Descargar PDF
        </button>
      </header>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '25px' }}>
        {['ENVIADA', 'APROBADA', 'DENEGADA'].map((estado) => (
          <button 
            key={estado}
            onClick={() => setFiltro(estado)}
            style={{
              padding: '10px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: filtro === estado ? '#0f172a' : '#f1f5f9',
              color: filtro === estado ? 'white' : '#475569',
              fontWeight: '600'
            }}
          >
            {estado === 'ENVIADA' ? 'Pendientes' : estado}
          </button>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '20px', textAlign: 'left', color: '#475569' }}>Adoptante</th>
              <th style={{ padding: '20px', textAlign: 'left', color: '#475569' }}>Mascota</th>
              <th style={{ padding: '20px', textAlign: 'center', color: '#475569' }}>Estado</th>
              <th style={{ padding: '20px', textAlign: 'right', color: '#475569' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.filter(s => s.estadoSolicitud === filtro).map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '20px' }}>{s.usuario?.nombre}</td>
                <td style={{ padding: '20px' }}>{s.mascota?.nombre}</td>
                <td style={{ padding: '20px', textAlign: 'center' }}>
                  <span style={getBadgeStyle(s.estadoSolicitud)}>{s.estadoSolicitud}</span>
                </td>
                <td style={{ padding: '20px', textAlign: 'right' }}>
                  <button onClick={() => setSolicitudSeleccionada(s)} style={{ background: '#eff6ff', color: '#2563eb', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {solicitudSeleccionada && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '450px' }}>
            <h2 style={{ marginTop: 0 }}>Solicitud de {solicitudSeleccionada.usuario?.nombre}</h2>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', margin: '20px 0' }}>
              <p><strong>Mascota:</strong> {solicitudSeleccionada.mascota?.nombre}</p>
              <p><strong>Vivienda:</strong> {solicitudSeleccionada.tipoVivienda}</p>
              <p><strong>Motivo:</strong> {solicitudSeleccionada.motivo}</p>
            </div>
            {solicitudSeleccionada.estadoSolicitud === 'ENVIADA' && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => manejarEstado(solicitudSeleccionada.id, 'APROBADA')} style={{ flex: 1, padding: '14px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Aprobar ✅</button>
                <button onClick={() => manejarEstado(solicitudSeleccionada.id, 'DENEGADA')} style={{ flex: 1, padding: '14px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Denegar ❌</button>
              </div>
            )}
            <button onClick={() => setSolicitudSeleccionada(null)} style={{ width: '100%', marginTop: '12px', padding: '12px', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Solicitudes;