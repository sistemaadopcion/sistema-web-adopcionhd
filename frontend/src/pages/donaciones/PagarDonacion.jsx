import React from 'react';
import FormularioDonacion from './FormularioDonacion'; // Asegúrate de la ruta

const PagarDonacion = () => {
  return (
    <div style={{ padding: '100px 20px' }}>
      <h1 style={{ textAlign: 'center' }}>Completá tu donación</h1>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '30px' }}>
        Tu aporte hace la diferencia para el Santuario.
      </p>
      <FormularioDonacion />
    </div>
  );
};

export default PagarDonacion;