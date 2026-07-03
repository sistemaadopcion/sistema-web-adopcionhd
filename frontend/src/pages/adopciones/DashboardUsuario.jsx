import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerDashboardData } from "../../services/userService";

// Componente mejorado con color dinámico
const StatCard = ({ title, value, onClick, accentColor, bgColor }) => (
  <div 
    style={{ ...styles.card, borderTop: `4px solid ${accentColor}`, backgroundColor: bgColor }} 
    onClick={onClick} 
    className="card-hover"
  >
    <h3 style={styles.cardTitle}>{title}</h3>
    <p style={{ ...styles.cardValue, color: accentColor }}>{value ?? 0}</p>
  </div>
);

const DashboardUsuario = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ solicitudes: 0, favoritas: 0, perfil: 'Completado' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await obtenerDashboardData(userId);
        setData(response);
      } catch (err) { console.error("Error:", err); }
      finally { setLoading(false); }
    };
    cargarDatos();
  }, []);

  if (loading) return <div style={styles.center}>Cargando panel... 🐾</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.welcome}>Panel de Gestión</h1>
          <p style={styles.subtitle}>Bienvenido al centro de mando de Can Martín.</p>
        </div>
        {/* Botón de historial/notificaciones */}
        <button style={styles.historyButton} onClick={() => navigate('/mis-solicitudes')}>
          🔔 Historial de Adopciones
        </button>
      </header>

      <div style={styles.grid}>
        <StatCard title="Mis Solicitudes" value={data.solicitudes} accentColor="#0284c7" bgColor="#f0f9ff" onClick={() => navigate('/mis-solicitudes')} />
        <StatCard title="Mascotas Favoritas" value={data.favoritas} accentColor="#059669" bgColor="#f0fdf4" onClick={() => navigate('/mascotas')} />
        <StatCard title="Estado Perfil" value={data.perfil} accentColor="#d97706" bgColor="#fffbeb" onClick={() => navigate('/perfil')} />
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 20px', maxWidth: '950px', margin: 'auto', fontFamily: "'Segoe UI', sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  welcome: { fontSize: '2rem', color: '#1e293b', margin: 0 },
  subtitle: { color: '#64748b' },
  historyButton: { 
    padding: '12px 20px', backgroundColor: '#f1f5f9', border: 'none', 
    borderRadius: '12px', cursor: 'pointer', fontWeight: '600', color: '#475569',
    transition: '0.3s'
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' },
  card: { 
    padding: '30px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', 
    cursor: 'pointer', transition: 'transform 0.2s' 
  },
  cardTitle: { color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '10px' },
  cardValue: { fontSize: '2.5rem', fontWeight: '800', margin: 0 },
  center: { textAlign: 'center', marginTop: '100px', fontSize: '1.2rem', color: '#64748b' }
};

export default DashboardUsuario;