import React, { useState } from 'react';
import TarjetaMascota from './TarjetaMascota';
import DetalleMascota from './DetalleMascota';

const MASCOTAS_MOCK = [
  { 
    id: 1, 
    nombre: 'Luna', 
    edad: '2 años', 
    raza: 'Labrador', 
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500',
    descripcion: 'Luna es una perrita sumamente cariñosa, juguetona y con mucha energía.'
  },
  { 
    id: 2, 
    nombre: 'Michi', 
    edad: '1 año', 
    raza: 'Siamés', 
    foto: 'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Siamese201.jpg?itok=j9A2IvjN',
    descripcion: 'Michi es un gatito muy tranquilo, independiente y ronroneador.'
  }
];

// Recibimos setView y setMascotaSeleccionada desde App.jsx
function Mascotas({ setView, setMascotaSeleccionadaGlobal }) {
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

  const handleVerDetalle = (id) => {
    const encontrada = MASCOTAS_MOCK.find(m => m.id === id);
    setMascotaSeleccionada(encontrada);
  };

  if (mascotaSeleccionada) {
    return (
      <DetalleMascota 
        mascota={mascotaSeleccionada} 
        onVolver={() => setMascotaSeleccionada(null)} 
        onSolicitarAdopcion={(mascota) => {
            setMascotaSeleccionadaGlobal(mascota); // Pasa la mascota a App.jsx
            setView('formulario');                 // Cambia a vista 'formulario'
        }}
        />
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>🐾 Catálogo de Mascotas</h2>
      
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