import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { obtenerDashboardData } from "../../services/userService";
import { Heart, FileText, User, PawPrint, Lightbulb, ChevronRight, Bell, CalendarClock } from 'lucide-react';

const DashboardUsuario = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ solicitudes: 0, favoritas: 0, perfil: 'Completado' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await obtenerDashboardData(userId);
        setData(response);
      } catch (err) { console.error("Error:", err); }
      finally { setLoading(false); }
    };
    cargarDatos();
  }, []);

  if (loading) return <div className="flex justify-center mt-20 text-can-secondary text-xl">Cargando tu espacio, César... 🐾</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10 animate-in fade-in duration-700">
      
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-can-secondary mb-2">¡Hola, César! 👋</h1>
          <p className="text-gray-600 text-lg">Tu camino para adoptar está en marcha.</p>
        </div>
      </header>

      {/* Grid de Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Solicitudes Activas" value={data.solicitudes} icon={<FileText size={24}/>} color="bg-can-primary" onClick={() => navigate('/mis-solicitudes')} />
        <StatCard title="Mis Favoritos" value={data.favoritas} icon={<Heart size={24}/>} color="bg-can-accent" onClick={() => navigate('/mascotas')} />
        <StatCard title="Estado Perfil" value={data.perfil} icon={<User size={24}/>} color="bg-can-secondary" onClick={() => navigate('/perfil')} />
      </div>

      {/* Seguimiento Rápido */}
      <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-orange-200 p-3 rounded-full text-orange-700"><Bell size={24} /></div>
          <div>
            <h3 className="font-bold text-can-secondary">Seguimiento de adopción</h3>
            <p className="text-sm text-gray-600">Revisa el estatus más reciente de tus gestiones abiertas.</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/mis-solicitudes')} 
          className="text-can-primary font-bold flex items-center hover:underline cursor-pointer"
        >
          Ver detalles <ChevronRight size={18}/>
        </button>
      </div>

      {/* Bloque de Tips Educativos y Avisos */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-can-secondary text-white p-8 rounded-3xl flex items-center gap-6 shadow-md">
            <div className="bg-white/10 p-4 rounded-full"><Lightbulb size={40} className="text-can-primary" /></div>
            <div>
              <h3 className="text-xl font-bold mb-1">¿Sabías que...?</h3>
              <p className="opacity-90 leading-relaxed text-sm">Los primeros 3 días en un nuevo hogar son fundamentales para que tu mascota se adapte.</p>
            </div>
        </div>

        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-can-secondary mb-4 flex items-center gap-2">📢 Avisos de la Comunidad</h3>
          <div className="space-y-4">
            <AvisoItem titulo="Jornada de Vacunación" fecha="25 Jul" desc="Trae a tu compañero a la sede." />
            <AvisoItem titulo="Entrega de Alimentos" fecha="28 Jul" desc="Apoyo a hogares temporales." />
          </div>
        </section>
      </div>

      {/* Carrusel de Mascotas */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <CarruselMascotas />
      </div>

      {/* Sección de Acción Principal */}
      <div className="bg-white border-2 border-can-primary border-opacity-10 p-8 rounded-3xl flex justify-between items-center shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-can-secondary mb-2">¿Buscas un nuevo amigo?</h3>
          <p className="text-gray-600">Explora nuestro catálogo y encuentra a tu compañero ideal.</p>
        </div>
        <button 
          onClick={() => navigate('/mascotas')}
          className="bg-can-primary hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <PawPrint size={20} /> Ver Mascotas
        </button>
      </div>
    </div>
  );
};

// Componentes Auxiliares
const CarruselMascotas = () => {
  const mascotas = [
    { id: 1, nombre: "Max", img: "https://placedog.net/300/300?id=1" },
    { id: 2, nombre: "Luna", img: "https://placedog.net/300/300?id=7" },
    { id: 3, nombre: "Rocky", img: "https://placedog.net/300/300?id=12" },
    { id: 4, nombre: "Daisy", img: "https://placedog.net/300/300?id=5" }
  ];
  return (
    <div className="overflow-hidden">
      <h3 className="text-lg font-bold text-can-secondary mb-6">🐾 Mascotas Destacadas</h3>
      <motion.div className="flex gap-6" animate={{ x: [0, -200, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
        {mascotas.map((m) => (
          <div key={m.id} className="min-w-[160px] text-center">
            <img src={m.img} alt={m.nombre} className="w-full h-32 object-cover rounded-2xl shadow-md" />
            <p className="mt-2 text-sm font-bold text-gray-700">{m.nombre}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AvisoItem = ({ titulo, fecha, desc }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-2xl">
    <div className="bg-can-primary/10 text-can-primary p-2 rounded-xl mr-3"><CalendarClock size={18}/></div>
    <div>
      <h4 className="font-bold text-xs text-can-secondary">{titulo} <span className="text-[10px] text-gray-400 ml-1">({fecha})</span></h4>
      <p className="text-[11px] text-gray-600">{desc}</p>
    </div>
  </div>
);

const StatCard = ({ title, value, onClick, color, icon }) => (
  <div onClick={onClick} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
    <div className={`w-12 h-12 ${color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-4 text-gray-700`}>
      {icon}
    </div>
    <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
    <p className="text-4xl font-bold text-can-secondary mt-1">{value}</p>
  </div>
);

export default DashboardUsuario;