import React from 'react';

function Home({ setView }) {
  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px', fontFamily: "'Inter', sans-serif" },
    banner: {
      width: '100%', height: '500px',
      backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1600')",
      backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '30px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      color: 'white', textAlign: 'center', marginBottom: '60px'
    },
    title: { fontSize: '3.5rem', fontWeight: '800', marginBottom: '15px' },
    subtitle: { fontSize: '1.25rem', opacity: '0.9', maxWidth: '600px', marginBottom: '30px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' },
    card: { padding: '40px', background: '#f8fafc', borderRadius: '24px', textAlign: 'center', transition: '0.3s' },
    actionButton: {
      background: '#0f172a', color: 'white', border: 'none', padding: '18px 40px',
      fontSize: '1.1rem', fontWeight: '700', borderRadius: '16px', cursor: 'pointer',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.banner}>
        <h1 style={styles.title}>Huellitas Digitales</h1>
        <p style={styles.subtitle}>Encontramos hogares llenos de amor para quienes más lo necesitan. Tu próximo mejor amigo te espera.</p>
        <button onClick={() => setView('mascotas')} style={styles.actionButton}>¡Adoptar ahora!</button>
      </header>

      {/* Grid de Beneficios - Esto da mucha autoridad al sitio */}
      <section style={styles.grid}>
        <FeatureCard icon="🐕" title="Rescate Responsable" desc="Damos atención veterinaria y amor a cada mascota recuperada." />
        <FeatureCard icon="🏠" title="Proceso Seguro" desc="Verificamos entornos para asegurar una adopción exitosa y feliz." />
        <FeatureCard icon="❤️" title="Amor Incondicional" desc="Más que una adopción, es el inicio de una vida compartida." />
      </section>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div style={{ padding: '40px', background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{icon}</div>
    <h3 style={{ marginBottom: '10px', fontSize: '1.4rem' }}>{title}</h3>
    <p style={{ color: '#64748b', lineHeight: '1.6' }}>{desc}</p>
  </div>
);

export default Home;