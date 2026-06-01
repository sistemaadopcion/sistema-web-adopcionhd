import React from 'react';
import TarjetaMascota from './TarjetaMascota'; // 👈 Importamos el componente del Issue #7

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
          /* 🚀 Aquí se cumple el Issue #7: Usamos la tarjeta modular pasándole los datos */
          <TarjetaMascota 
            key={mascota.id} 
            mascota={mascota} 
            onVerDetalle={handleVerDetalle} 
          />
        ))}
      </div>
    </div>
  );
}

export default Mascotas;