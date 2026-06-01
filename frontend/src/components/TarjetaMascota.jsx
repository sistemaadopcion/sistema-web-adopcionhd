import React from 'react';

// 🐾 Componente reutilizable del Issue #7
function TarjetaMascota({ mascota, onVerDetalle }) {
  return (
    <div 
      style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '12px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)', 
        overflow: 'hidden',
        transition: 'transform 0.2s',
        textAlign: 'left'
      }}
    >
      {/* Criterio: Imagen de la mascota (Sincronizado con la propiedad .foto de tu BD) */}
      <img 
        src={mascota.foto} 
        alt={mascota.nombre} 
        style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
      />
      
      <div style={{ padding: '15px' }}>
        {/* Criterio: Nombre y Edad */}
        <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{mascota.nombre}</h3>
        <p style={{ margin: '0 0 15px 0', color: '#16a085', fontWeight: '500' }}>{mascota.edad}</p>
        
        {/* Criterio: Botón "Ver detalle" */}
        <button 
          onClick={() => onVerDetalle(mascota.id)}
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
  );
}

export default TarjetaMascota;