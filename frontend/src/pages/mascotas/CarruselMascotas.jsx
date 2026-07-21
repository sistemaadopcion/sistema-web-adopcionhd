import React from 'react';
import { motion } from 'framer-motion';

const mascotasDestacadas = [
  { id: 1, nombre: "Max", img: "https://placedog.net/300/300?id=1" },
  { id: 2, nombre: "Luna", img: "https://placedog.net/300/300?id=7" },
  { id: 3, nombre: "Rocky", img: "https://placedog.net/300/300?id=12" },
];

const CarruselMascotas = () => {
  return (
    <div className="overflow-hidden py-6">
      <h3 className="text-lg font-bold text-can-secondary mb-4 px-2">🐾 Mascotas Destacadas</h3>
      <motion.div 
        className="flex gap-4"
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {mascotasDestacadas.map((m) => (
          <div key={m.id} className="min-w-[150px] text-center">
            <img src={m.img} alt={m.nombre} className="w-full h-32 object-cover rounded-2xl shadow-sm" />
            <p className="mt-2 text-sm font-bold text-gray-700">{m.nombre}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CarruselMascotas;