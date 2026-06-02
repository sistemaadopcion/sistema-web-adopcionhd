import React, { useEffect, useState } from 'react';
import { obtenerSolicitudes } from '../../services/adopcionService';
import { obtenerTodasLasMascotas } from '../../services/mascotaService';

function AdminDashboard() {
  const [stats, setStats] = useState({ totalSolicitudes: 0, pendientes: 0, totalMascotas: 0, cargando: true });

  useEffect(() => {
    cargarEstadísticas();
  }, []);

  const cargarEstadísticas = async () => {
    try {
      // Ejecutamos ambas peticiones en paralelo para que cargue más rápido
      const [solicitudes, mascotas] = await Promise.all([
        obtenerSolicitudes(),
        obtenerTodasLasMascotas()
      ]);
      
      setStats({
        totalSolicitudes: solicitudes.length,
        // Asegúrate de que 'estadoSolicitud' coincida con tu entidad Java
        pendientes: solicitudes.filter(s => s.estadoSolicitud === 'PENDIENTE').length,
        totalMascotas: mascotas.length,
        cargando: false
      });
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      setStats(prev => ({ ...prev, cargando: false }));
    }
  };

  if (stats.cargando) return <div style={{ padding: '40px' }}>Cargando datos del sistema...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
      <h1 style={{ color: '#0f172a' }}>📊 Dashboard Administrativo</h1>
      <p style={{ color: '#64748b' }}>Resumen en tiempo real de la plataforma "Can Martin".</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '30px' }}>
        <Card title="Solicitudes Pendientes" value={stats.pendientes} color="#f59e0b" />
        <Card title="Total Solicitudes" value={stats.totalSolicitudes} color="#3b82f6" />
        <Card title="Mascotas en Sistema" value={stats.totalMascotas} color="#10b981" />
      </div>
    </div>
  );
}

const Card = ({ title, value, color }) => (
  <div style={{ padding: '25px', background: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', borderLeft: `6px solid ${color}` }}>
    <h3 style={{ color: '#475569', margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h3>
    <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: '10px 0 0 0', color: '#1e293b' }}>{value}</p>
  </div>
);

export default AdminDashboard; 