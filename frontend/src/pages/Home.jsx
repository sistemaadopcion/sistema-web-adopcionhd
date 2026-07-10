import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="bg-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1600" 
          alt="Adopción"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
        />
        <div className="relative z-10 flex flex-col justify-center h-full px-margin-desktop max-w-container-max mx-auto text-white">
          <span className="bg-primary-container/20 text-primary-fixed w-fit px-4 py-1 rounded-full text-label-md uppercase tracking-widest mb-4">
            Compromiso & Corazón
          </span>
          <h1 className="font-headline-xl text-5xl md:text-7xl font-bold mb-6">
            Encuentra una conexión<br/>
            <span className="italic font-normal">llena de armonía</span>
          </h1>
          <p className="max-w-xl text-body-lg mb-8 opacity-90">
            Transformamos vidas a través de la adopción responsable. Cada latido merece un hogar donde la paz y el amor florezcan en cada rincón.
          </p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/mascotas')} className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:opacity-90 flex items-center gap-2">
              Explorar Mascotas <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10">
              Conocer Nuestra Historia
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Mascotas (Bento) */}
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-lg text-4xl text-on-surface">Esperando por ti</h2>
            <p className="text-secondary mt-2">Conoce a nuestros residentes actuales que buscan un nuevo comienzo.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-1 hover:underline">
            Ver todos los animales <span className="material-symbols-outlined">east</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Tarjeta Mascota */}
          <div className="bg-white rounded-3xl overflow-hidden border border-outline-variant/20 shadow-sm">
            <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800" className="w-full h-80 object-cover" alt="Max" />
            <div className="p-8 flex justify-between items-center">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className="bg-secondary-container px-3 py-1 rounded-full text-label-sm">Activo</span>
                  <span className="bg-surface-variant px-3 py-1 rounded-full text-label-sm">2 Años</span>
                </div>
                <h3 className="text-2xl font-bold">Max</h3>
                <p className="text-secondary">Border Collie • Inteligente y Leal</p>
              </div>
              <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-error-container">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </div>
          
          {/* Tarjeta Mascota 2 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-outline-variant/20 shadow-sm">
            <div className="w-full h-80 bg-surface-container-high flex items-center justify-center">
               <span className="material-symbols-outlined text-6xl text-outline">pets</span>
            </div>
            <div className="p-8">
              <div className="flex gap-2 mb-2">
                <span className="bg-secondary-container px-3 py-1 rounded-full text-label-sm">Tranquila</span>
                <span className="bg-surface-variant px-3 py-1 rounded-full text-label-sm">4 Años</span>
              </div>
              <h3 className="text-2xl font-bold">Luna</h3>
              <p className="text-secondary">Maine Coon • Elegante y Afectuosa</p>
              <button className="w-full mt-6 py-3 border border-primary text-primary rounded-xl font-bold hover:bg-primary-container/10">Ver Detalles</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Pasos */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop text-center">
          <h2 className="text-4xl font-bold mb-16">Cómo sucede la magia</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[ {icon: 'search', t: 'Discovery'}, {icon: 'favorite', t: 'Connection'}, {icon: 'home_pin', t: 'Welcome'} ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-primary">{step.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-2">{step.t}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;