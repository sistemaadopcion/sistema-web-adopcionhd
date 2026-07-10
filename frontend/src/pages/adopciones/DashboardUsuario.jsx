import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerDashboardData } from "../../services/userService";

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

  if (loading) return <div style={styles.center}>Cargando tu espacio, César... 🐾</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.welcome}>¡Hola de nuevo! 👋</h1>
          <p style={styles.subtitle}>Gestiona tus procesos de adopción desde aquí.</p>
        </div>
        <button style={styles.historyButton} onClick={() => navigate('/mis-solicitudes')}>
          📜 Ver Mis Solicitudes
        </button>
      </header>

      {/* Grid de Stats */}
      <div style={styles.grid}>
        <StatCard title="Solicitudes Activas" value={data.solicitudes} accentColor="#0284c7" icon="📮" onClick={() => navigate('/mis-solicitudes')} />
        <StatCard title="Mis Favoritos" value={data.favoritas} accentColor="#059669" icon="❤️" onClick={() => navigate('/mascotas')} />
        <StatCard title="Estado Perfil" value={data.perfil} accentColor="#d97706" icon="🛡️" onClick={() => navigate('/perfil')} />
      </div>

      {/* Sección de Acción Rápida */}
      <div style={styles.actionSection}>
        <div style={styles.actionContent}>
          <h3>¿Buscas un nuevo amigo?</h3>
          <p>Explora nuestro catálogo actualizado de mascotas listas para un hogar.</p>
        </div>
        <button style={styles.ctaButton} onClick={() => navigate('/mascotas')}>Ver Mascotas 🐶</button>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, onClick, accentColor, icon }) => (
  <div style={{ ...styles.card, borderLeft: `6px solid ${accentColor}` }} onClick={onClick}>
    <div style={styles.cardHeader}>
      <span style={styles.cardIcon}>{icon}</span>
      <h3 style={styles.cardTitle}>{title}</h3>
    </div>
    <p style={{ ...styles.cardValue, color: accentColor }}>{value}</p>
  </div>
);

const styles = {
  container: { padding: '40px 20px', maxWidth: '1000px', margin: 'auto', animation: 'fadeIn 0.8s' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  welcome: { fontSize: '2.5rem', color: '#0f172a', margin: '0 0 10px 0' },
  subtitle: { color: '#64748b', fontSize: '1.1rem' },
  historyButton: { 
    padding: '12px 24px', backgroundColor: '#0f172a', color: 'white', border: 'none', 
    borderRadius: '14px', cursor: 'pointer', fontWeight: '600', transition: '0.3s'
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' },
  card: { 
    padding: '25px', borderRadius: '24px', background: '#ffffff', 
    boxShadow: '0 10px 20px rgba(0,0,0,0.04)', cursor: 'pointer', transition: '0.3s' 
  },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '10px' },
  cardIcon: { fontSize: '1.5rem' },
  cardTitle: { color: '#64748b', fontSize: '0.9rem', margin: 0 },
  cardValue: { fontSize: '3rem', fontWeight: '800', margin: '10px 0 0 0' },
  actionSection: { 
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
    padding: '40px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
  },
  actionContent: { maxWidth: '60%' },
  ctaButton: { padding: '15px 30px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer' },
  center: { textAlign: 'center', marginTop: '100px', fontSize: '1.2rem', color: '#64748b' }
};

export default DashboardUsuario;