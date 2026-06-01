import React from 'react';

// Componente que cumple con todos los criterios del Issue #8
function DetalleMascota({ mascota, onVolver }) {
  const handleAdoptar = () => {
    alert(`🎉 ¡Solicitud de adopción iniciada para ${mascota.nombre}! Próximamente se conectará con el formulario.`);
  };

  if (!mascota) {
    return <p style={{ textAlign: 'center', padding: '20px' }}>No se ha seleccionado ninguna mascota.</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      {/* Botón para regresar al catálogo general */}
      <button 
        onClick={onVolver}
        style={{ marginBottom: '20px', padding: '8px 15px', backgroundColor: '#7f8c8d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ⬅️ Volver al Catálogo
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {/* Criterio: Imagen grande */}
        <div style={{ flex: '1 1 350px' }}>
          <img 
            src={mascota.foto} 
            alt={mascota.nombre} 
            style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px' }} 
          />
        </div>

        {/* Criterio: Información técnica detallada */}
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Criterio: Nombre, edad, raza */}
            <h1 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>{mascota.nombre}</h1>
            <p style={{ fontSize: '18px', margin: '5px 0', color: '#16a085' }}><strong>Edad:</strong> {mascota.edad}</p>
            <p style={{ fontSize: '18px', margin: '5px 0', color: '#34495e' }}><strong>Raza:</strong> {mascota.raza || 'Mestizo'}</p>
            
            <hr style={{ border: '0', height: '1px', backgroundColor: '#eee', margin: '15px 0' }} />

            {/* Criterio: Descripción */}
            <h3 style={{ color: '#2c3e50', marginBottom: '5px' }}>Descripción:</h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6', fontSize: '16px', margin: '0' }}>
              {mascota.descripcion}
            </p>
          </div>

          {/* Criterio: Botón "Adoptar" */}
          <button 
            onClick={handleAdoptar}
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#e67e22', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              fontSize: '18px',
              marginTop: '25px',
              boxShadow: '0 4px 6px rgba(230, 126, 34, 0.2)'
            }}
          >
            💝 Solicitar Adopción
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleMascota;