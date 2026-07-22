import React, { useState } from 'react';
import { CheckCircle2, UserPlus, X, AlertCircle } from 'lucide-react';

const Voluntariado = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

  const requisitos = [
    "Compromiso real con el bienestar animal.",
    "Respeto y empatía en cada interacción.",
    "Ser mayor de edad.",
    "Disponibilidad horaria para tareas fijas."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !telefono || !experiencia) {
      setAlerta({ tipo: 'error', mensaje: 'Por favor completa todos los campos requeridos.' });
      return;
    }

    setEnviando(true);
    setAlerta({ tipo: '', mensaje: '' });

    // Payload adaptado exactamente a las columnas de tu Supabase (nombre, telefono, experiencia)
    const payload = { 
      nombre, 
      telefono, 
      experiencia,
      estado: 'PENDIENTE' 
    };

    try {
      const API_BASE = import.meta.env.VITE_API_URL || "https://backend-sistema-production-b4b3.up.railway.app";
      
      const response = await fetch(`${API_BASE}/api/voluntarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Error en el servidor al registrar voluntario");

      // Alerta visual bonita dentro del modal (Adiós al alert feo del navegador)
      setAlerta({ 
        tipo: 'exito', 
        mensaje: '¡Solicitud enviada con éxito! Ya estás registrado en nuestra base de datos.' 
      });

      setTimeout(() => {
        setModalAbierto(false);
        setNombre('');
        setTelefono('');
        setExperiencia('');
        setAlerta({ tipo: '', mensaje: '' });
      }, 2500);

    } catch (err) {
      console.error("Error:", err);
      setAlerta({ tipo: 'error', mensaje: 'Hubo un error al enviar tu solicitud. Verifica la conexión con el servidor.' });
    } finally {
      setEnviando(false);
    }
  };

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
          <button 
            onClick={() => setModalAbierto(true)}
            className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition cursor-pointer"
          >
            Completar formulario
          </button>
        </div>
      </div>

      {/* MODAL DEL FORMULARIO CON ALERTA INTEGRADA */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full p-8 rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setModalAbierto(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">Unite al equipo</h2>
            
            {/* Alerta Visual Elegante */}
            {alerta.mensaje && (
              <div className={`mb-6 p-4 rounded-2xl text-sm flex items-center gap-3 ${
                alerta.tipo === 'exito' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {alerta.tipo === 'exito' ? <CheckCircle2 size={22} className="shrink-0" /> : <AlertCircle size={22} className="shrink-0" />}
                <span className="font-medium">{alerta.mensaje}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  required
                  placeholder="Ej. César Pérez"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Teléfono</label>
                <input 
                  type="text" 
                  value={telefono} 
                  onChange={(e) => setTelefono(e.target.value)} 
                  required
                  placeholder="Ej. 987654321"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Experiencia o Motivación</label>
                <textarea 
                  value={experiencia} 
                  onChange={(e) => setExperiencia(e.target.value)} 
                  required
                  rows="3"
                  placeholder="Cuéntanos por qué quieres ayudar..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={enviando || alerta.tipo === 'exito'}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-4 rounded-xl transition shadow-lg mt-4 cursor-pointer disabled:opacity-50"
              >
                {enviando ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Voluntariado;