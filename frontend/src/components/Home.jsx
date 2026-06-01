import React from 'react';

function Home({ setView }) {
  // --- Estilos Inline con enfoque Moderno y Limpio ---
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: '#1e293b',
      textAlign: 'center'
    },
    // Banner Principal elegante sin depender de imágenes locales pesadas (usamos Unsplash enfocado en mascotas)
    banner: {
      width: '100%',
      height: '400px',
      backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.6)), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      boxSizing: 'border-box'
    },
    title: {
      color: '#ffffff',
      fontSize: '42px',
      fontWeight: '800',
      marginBottom: '12px',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      letterSpacing: '0.5px'
    },
    subtitle: {
      color: '#e2e8f0',
      fontSize: '18px',
      fontWeight: '500',
      maxWidth: '600px',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      lineHeight: '1.5'
    },
    // Contenido inferior descriptivo informativo
    infoSection: {
      marginTop: '50px',
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      border: '1px solid #f1f5f9'
    },
    heading: {
      fontSize: '28px',
      color: '#0f172a',
      fontWeight: '700',
      marginBottom: '16px'
    },
    description: {
      fontSize: '16px',
      color: '#64748b',
      lineHeight: '1.8',
      maxWidth: '800px',
      margin: '0 auto 30px auto'
    },
    // Botón interactivo premium con transiciones funcionales
    actionButton: {
      background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', // Celeste/azul brillante
      color: '#ffffff',
      border: 'none',
      padding: '14px 32px',
      fontSize: '16px',
      fontWeight: '700',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)',
      transition: 'all 0.25s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  return (
    <div style={styles.container}>
      {/* 1 y 2: Nombre del Albergue e Imagen/Banner Principal */}
      <header style={styles.banner}>
        <h1 style={styles.title}>🐾 Huellitas Digitales</h1>
        <p style={styles.subtitle}>Un hogar temporal lleno de amor, esperando transformar una vida a la vez.</p>
      </header>

      {/* 3: Breve descripción de la misión del albergue */}
      <section style={styles.infoSection}>
        <h2 style={styles.heading}>Nuestra Misión</h2>
        <p style={styles.description}>
          En Huellitas Digitales nos dedicamos al rescate, rehabilitación y cuidado temporal de perritos y gatitos en situación de vulnerabilidad. Nuestro objetivo principal es conectar a estas adorables mascotas con familias responsables y amorosas que estén listas para brindarles una segunda oportunidad. ¡Cada adopción salva una vida!
        </p>

        {/* 4: Botón funcional que cambia la vista hacia la sección 'mascotas' */}
        <button 
          onClick={() => setView('mascotas')}
          style={styles.actionButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(56, 189, 248, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(56, 189, 248, 0.3)';
          }}
        >
          🔍 Ver mascotas disponibles
        </button>
      </section>
    </div>
  );
}

export default Home;