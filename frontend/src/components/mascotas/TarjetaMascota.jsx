import React from 'react';

// 🐾 Componente reutilizable con estilo mejorado Can Martín
function TarjetaMascota({ mascota, onVerDetalle }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      
      {/* Imagen con un ligero zoom al hacer hover */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={mascota.foto} 
          alt={mascota.nombre} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-can-secondary">
          {mascota.edad}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Nombre */}
        <h3 className="text-xl font-bold text-can-secondary mb-4">{mascota.nombre}</h3>
        
        {/* Botón de acción con los colores de marca */}
        <button 
          onClick={() => onVerDetalle(mascota.id)}
          className="mt-auto w-full py-3 bg-can-primary hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors duration-300 shadow-sm"
        >
          Conocer más
        </button>
      </div>
    </div>
  );
}

export default TarjetaMascota;