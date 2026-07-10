import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="bg-surface min-h-screen text-on-surface">
      {/* Hero Section con mejor contraste */}
      <section className="relative w-full h-[90vh] overflow-hidden flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1600" 
          alt="Adopción"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom brightness-[0.6]"
        />
        <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md text-primary-fixed px-4 py-1.5 rounded-full text-label-md font-bold uppercase tracking-widest border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
              Compromiso & Corazón
            </span>
            <h1 className="font-headline-xl text-5xl md:text-7xl font-bold text-white leading-[1.1]">
              Encuentra una conexión<br/>
              <span className="text-primary-fixed italic font-light">llena de armonía</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-lg leading-relaxed">
              Transformamos vidas a través de la adopción responsable. Cada latido merece un hogar donde la paz y el amor florezcan en cada rincón.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => navigate('/mascotas')} className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-2 shadow-xl">
                Explorar Mascotas <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Mascotas - Estilo Bento Moderno */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-headline-lg text-4xl font-bold">Esperando por ti</h2>
            <p className="text-secondary mt-2">Nuevos compañeros buscan un hogar lleno de cariño.</p>
          </div>
          <button onClick={() => navigate('/mascotas')} className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Ver catálogo completo <span className="material-symbols-outlined">east</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjetas con efecto de elevación */}
          <PetCard 
            img="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800" 
            name="Max" 
            desc="Border Collie • Inteligente y Leal" 
            tags={['Activo', '2 Años']} 
          />
          <PetCard 
            isPlaceholder 
            name="Luna" 
            desc="Maine Coon • Elegante y Afectuosa" 
            tags={['Tranquila', '4 Años']} 
          />
        </div>
      </section>

      {/* Sección Pasos - Con mejor jerarquía */}
      <section className="py-24 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-20">Tu camino a la adopción</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[ {i: 'search', t: 'Discovery'}, {i: 'favorite', t: 'Connection'}, {i: 'home_pin', t: 'Welcome'} ].map((s, i) => (
              <div key={i} className="group p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-20 h-20 mx-auto bg-primary-container/20 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">{s.i}</span>
                </div>
                <h4 className="text-xl font-bold">{s.t}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const PetCard = ({ img, name, desc, tags, isPlaceholder }) => (
  <div className="group bg-white rounded-3xl overflow-hidden border border-outline-variant/30 hover:border-primary/30 transition-all hover:shadow-2xl">
    {isPlaceholder ? (
      <div className="w-full h-80 bg-surface-container-high flex items-center justify-center text-outline">
        <span className="material-symbols-outlined text-7xl">pets</span>
      </div>
    ) : (
      <img src={img} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" alt={name} />
    )}
    <div className="p-8 flex justify-between items-center">
      <div>
        <div className="flex gap-2 mb-3">
          {tags.map(t => <span key={t} className="bg-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase">{t}</span>)}
        </div>
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-secondary">{desc}</p>
      </div>
      <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-error-container hover:text-error transition-colors">
        <span className="material-symbols-outlined">favorite</span>
      </button>
    </div>
  </div>
);

export default Home;