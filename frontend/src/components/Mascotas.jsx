import React, { useState } from 'react';
import TarjetaMascota from './TarjetaMascota';
import DetalleMascota from './DetalleMascota'; // 👈 Importamos la nueva vista del Issue #8

// Completamos los objetos locales con los campos requeridos por el Issue #8 y tu script SQL
const MASCOTAS_MOCK = [
  { 
    id: 1, 
    nombre: 'Luna', 
    edad: '2 años', 
    raza: 'Labrador', 
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500',
    descripcion: 'Luna es una perrita sumamente cariñosa, juguetona y con mucha energía. Le encanta correr en parques y se lleva excelente con niños pequeños y otras mascotas.'
  },
  { 
    id: 2, 
    nombre: 'Michi', 
    edad: '1 año', 
    raza: 'Siamés', 
    foto: 'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Siamese201.jpg?itok=j9A2IvjN',
    descripcion: 'Michi es un gatito muy tranquilo, independiente y ronroneador. Ideal para departamentos, le fascina descansar cerca de las ventanas bajo la luz del sol.'
  }
];

function Mascotas() {
  // Estado para saber qué mascota está seleccionada (null significa que muestra el catálogo completo)
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  const handleVerDetalle = (id) => {
    const encontrada = MASCOTAS_MOCK.find(m => m.id === id);
    setMascotaSeleccionada(encontrada);
  };

  // RENDER CONDICIONAL: Si hay una mascota seleccionada, muestra su ficha técnica (Issue #8)
  if (mascotaSeleccionada) {
    return (
      <DetalleMascota 
        mascota={mascotaSeleccionada} 
        onVolver={() => setMascotaSeleccionada(null)} 
      />
    );
  }

  // Si es null, renderiza el catálogo responsivo habitual (Issue #6 y #7)
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>🐾 Catálogo de Mascotas en Adopción</h2>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Encuentra a tu compañero ideal entre nuestros rescatados listos para un hogar.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
        {MASCOTAS_MOCK.map((mascota) => (
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