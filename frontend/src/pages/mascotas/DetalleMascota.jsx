import React from 'react';

function DetalleMascota({ mascota, onVolver, onSolicitarAdopcion }) {
  if (!mascota) return null;

  return (
    <div style={{ 
      padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', 
      fontFamily: "'Segoe UI', sans-serif" 
    }}>
      {/* Botón Volver con estilo minimalista */}
      <button 
        onClick={onVolver}
        style={{ 
          marginBottom: '30px', padding: '10px 20px', backgroundColor: 'transparent', 
          color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '50px', 
          cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s' 
        }}
        onMouseOver={(e) => { e.target.style.backgroundColor = '#f1f5f9'; e.target.style.color = '#1e293b'; }}
        onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#64748b'; }}
      >
        ← Regresar al catálogo
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'start' }}>
        
        {/* Imagen Estilo Noir / Dark Fantasy */}
        <div style={{ 
          borderRadius: '30px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          position: 'relative'
        }}>
          <img 
            src={mascota.foto || 'https://via.placeholder.com/600'} 
            alt={mascota.nombre} 
            style={{ width: '100%', height: '550px', objectFit: 'cover', display: 'block', filter: 'brightness(0.95)' }} 
          />
        </div>

        {/* Panel de información */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', margin: '0', color: '#0f172a', letterSpacing: '-1px' }}>{mascota.nombre}</h1>
            <p style={{ color: '#64748b', fontSize: '1.25rem', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {mascota.especie} • {mascota.raza}
            </p>
          </div>

          {/* Badges profesionales */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {[mascota.tamanio, mascota.sexo, `${mascota.edad} años`].map((tag, i) => (
              <span key={i} style={{ 
                padding: '6px 18px', borderRadius: '50px', 
                background: '#f1f5f9', color: '#475569', 
                fontWeight: '600', fontSize: '0.9rem', border: '1px solid #e2e8f0' 
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <h3 style={{ color: '#0f172a', marginBottom: '15px' }}>Acerca de {mascota.nombre}</h3>
            <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {mascota.descripcion || 'Sin descripción disponible.'}
            </p>
          </div>

          {/* Botón de Acción con efecto Glow */}
          <button 
            onClick={() => onSolicitarAdopcion(mascota)}
            style={{ 
              marginTop: '10px', padding: '20px', backgroundColor: '#0f172a', color: '#ffffff', 
              border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: 'bold', 
              fontSize: '1.1rem', transition: 'all 0.3s', boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)' 
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#1e293b'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = '#0f172a'; e.target.style.transform = 'translateY(0)'; }}
          >
            Solicitar Adopción 🐾
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleMascota;