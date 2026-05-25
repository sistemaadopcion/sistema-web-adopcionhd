import React from 'react';

// Datos de prueba locales basados en los criterios del Issue #6
const MASCOTAS_MOCK = [
  { id: 1, nombre: 'Luna', edad: '2 años', foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500' },
  { id: 2, nombre: 'Michi', edad: '1 año', foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500' }
];




function Mascotas() {
  const handleVerDetalle = (id) => {
    alert(`🔍 Visualizando detalles de la mascota con ID: ${id} (Funcionalidad en construcción)`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>🐾 Catálogo de Mascotas en Adopción</h2>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Encuentra a tu compañero ideal entre nuestros rescatados listos para un hogar.</p>
      
      {/* Contenedor Grid Responsivo para las Tarjetas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
        {MASCOTAS_MOCK.map((mascota) => (
          <div 
            key={mascota.id} 
            style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '12px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
              overflow: 'hidden',
              transition: 'transform 0.2s',
              textAlign: 'left'
            }}
          >
            {/* Criterio: Imagen de la mascota */}
            <img 
                src={mascota.foto} // 👈 Cambiado de mascota.imagen a mascota.foto
                alt={mascota.nombre} 
                style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
            />
            
            <div style={{ padding: '15px' }}>
              {/* Criterio: Nombre y Edad */}
              <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{mascota.nombre}</h3>
              <p style={{ margin: '0 0 15px 0', color: '#16a085', fontWeight: '500' }}>{mascota.edad}</p>
              
              {/* Criterio: Botón "Ver detalle" */}
              <button 
                onClick={() => handleVerDetalle(mascota.id)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  backgroundColor: '#3498db', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Ver detalle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mascotas;