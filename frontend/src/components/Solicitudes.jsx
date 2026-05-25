import React from 'react';

// 📋 Datos de prueba simulados 100% idénticos al INSERT INTO solicitudes_adopcion de tu script SQL
const SOLICITUDES_MOCK = [
  {
    id: 1, // AUTO_INCREMENT
    fecha_solicitud: '2026-05-24 22:15:00', // DATETIME DEFAULT CURRENT_TIMESTAMP
    estado_solicitud: 'PENDIENTE', // ENUM('PENDIENTE','APROBADO','RECHAZADO')
    observaciones: 'Me gustaría adoptar a Luna, tengo espacio en casa.', // TEXT
    usuario_id: 2, // INT (Juan Pérez)
    mascota_id: 1, // INT (Luna)
    
    // Simulación del objeto Mascota que vendrá relacionado desde la base de datos
    mascota: {
      nombre: 'Luna', // VARCHAR(100)
      especie: 'PERRO', // ENUM('PERRO','GATO','OTRO')
      raza: 'Labrador', // VARCHAR(100)
      edad: 2, // INT (Alineado con el script SQL)
      tamanio: 'MEDIANO', // ENUM('PEQUENIO','MEDIANO','GRANDE')
      sexo: 'HEMBRA', // ENUM('MACHO','HEMBRA')
      foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500' // VARCHAR(500)
    }
  }
];

function Solicitudes() {
  // Función auxiliar para los colores del ENUM oficial de tu BD
  const obtenerEstiloEstado = (estado) => {
    switch (estado) {
      case 'APROBADO':
        return { backgroundColor: '#2ecc71', color: 'white' };
      case 'RECHAZADO':
        return { backgroundColor: '#e74c3c', color: 'white' };
      case 'PENDIENTE':
      default:
        return { backgroundColor: '#f1c40f', color: '#2c3e50' };
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', padding: '30px', textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>📋 Estado de mis Solicitudes</h2>
        <p style={{ color: '#7f8c8d', margin: '0' }}>Hitos de tus procesos de adopción en evaluación.</p>
      </div>

      {/* Criterio: Lista de solicitudes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {SOLICITUDES_MOCK.map((solicitud) => (
          <div 
            key={solicitud.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              padding: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              borderLeft: `6px solid ${
                solicitud.estado_solicitud === 'APROBADO' ? '#2ecc71' : 
                solicitud.estado_solicitud === 'RECHAZADO' ? '#e74c3c' : '#f1c40f'
              }`
            }}
          >
            {/* Criterio: Información de la mascota solicitada */}
            <img 
              src={solicitud.mascota.foto} 
              alt={solicitud.mascota.nombre}
              style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '50%' }}
            />

            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>
                Postulación para: {solicitud.mascota.nombre}
              </h3>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#7f8c8d' }}>
                <strong>Raza:</strong> {solicitud.mascota.raza} | <strong>Edad:</strong> {solicitud.mascota.edad} {solicitud.mascota.edad === 1 ? 'año' : 'años'}
              </p>
              <p style={{ margin: '0', color: '#34495e', fontStyle: 'italic', fontSize: '15px' }}>
                "{solicitud.observaciones}"
              </p>
            </div>

            {/* Criterio: Mostrar estado (PENDIENTE, APROBADO o RECHAZADO) */}
            <div style={{ textAlign: 'right', minWidth: '140px' }}>
              <span 
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  ...obtenerEstiloEstado(solicitud.estado_solicitud)
                }}
              >
                {solicitud.estado_solicitud}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Solicitudes;