import React from 'react';
import { CheckCircle2, UserPlus } from 'lucide-react';

const Voluntariado = () => {
  const requisitos = [
    "Compromiso real con el bienestar animal.",
    "Respeto y empatía en cada interacción.",
    "Ser mayor de edad.",
    "Disponibilidad horaria para tareas fijas."
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Sumate como voluntarix</h1>
        <p className="text-lg text-slate-600 mb-10">Buscamos personas comprometidas para el cuidado diario de nuestros animales. Si tenés ganas de ayudar, este es tu lugar.</p>
        
        <div className="bg-[#f8fafc] p-8 md:p-10 rounded-3xl mb-10 border border-slate-100">
          <h2 className="text-2xl font-bold mb-6">Requisitos Generales</h2>
          <ul className="space-y-4">
            {requisitos.map((req, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="text-green-600" size={20} />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center bg-slate-900 text-white p-10 rounded-3xl">
          <UserPlus size={48} className="mx-auto mb-4 text-orange-400" />
          <h3 className="text-2xl font-bold mb-2">¿Querés empezar?</h3>
          <p className="mb-8 opacity-90">Completá el formulario para que nuestro equipo se contacte con vos.</p>
          <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition">
            Completar formulario
          </button>
        </div>
      </div>
    </div>
  );
};

export default Voluntariado;