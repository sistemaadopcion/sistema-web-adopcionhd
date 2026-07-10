import React from 'react';

function Home({ setView }) {
  return (
    <main className="bg-background pt-20">
      {/* Hero Section - Adaptado al estilo Kindred Harmony */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1600" 
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container/10 text-primary font-label-md uppercase tracking-widest">
              Compromiso & Corazón
            </span>
            <h1 className="font-headline-xl text-4xl md:text-6xl text-on-surface leading-tight">
              Huellitas <span className="text-primary italic">Digitales</span>
            </h1>
            <p className="font-body-lg text-secondary max-w-lg">
              Encontramos hogares llenos de amor para quienes más lo necesitan. Tu próximo mejor amigo te espera en un proceso lleno de armonía.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => setView('mascotas')} 
                className="bg-primary text-on-primary font-label-md px-8 py-4 rounded-xl hover:opacity-95 transition-all active:scale-95 flex items-center gap-2 group shadow-lg"
              >
                ¡Adoptar ahora!
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Beneficios - Estilo Bento Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🐕" 
            title="Rescate Responsable" 
            desc="Damos atención veterinaria y amor a cada mascota recuperada." 
          />
          <FeatureCard 
            icon="🏠" 
            title="Proceso Seguro" 
            desc="Verificamos entornos para asegurar una adopción exitosa y feliz." 
          />
          <FeatureCard 
            icon="❤️" 
            title="Amor Incondicional" 
            desc="Más que una adopción, es el inicio de una vida compartida." 
          />
        </div>
      </section>

      {/* CTA Section - Estilo Testimonial de Kindred */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-primary text-on-primary p-12 md:p-20 rounded-[3rem] shadow-xl text-center space-y-8">
          <h2 className="font-headline-lg text-3xl md:text-5xl">¿Listo para cambiar una vida?</h2>
          <p className="text-on-primary/80 max-w-xl mx-auto text-lg">
            Tu próximo compañero está esperando. Únete a nuestra comunidad y sé parte del cambio.
          </p>
          <button 
            onClick={() => setView('mascotas')} 
            className="bg-white text-primary font-bold px-10 py-4 rounded-xl hover:bg-surface-container-low transition-all"
          >
            Ver catálogo disponible
          </button>
        </div>
      </section>
    </main>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/20 clay-shadow transition-all hover:-translate-y-2">
    <div className="text-5xl mb-6">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-on-surface">{title}</h3>
    <p className="text-secondary leading-relaxed">{desc}</p>
  </div>
);

export default Home;