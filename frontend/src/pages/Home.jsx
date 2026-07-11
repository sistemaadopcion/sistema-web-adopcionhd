import React from "react";
import { useNavigate } from "react-router-dom";

import { Search, Heart, MapPin, ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const navigate = useNavigate();

  const mascotas = [
    {
      id: 1,
      nombre: "Max",
      raza: "Border Collie",
      edad: "2 años",
      ciudad: "Lima",
      imagen:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      nombre: "Luna",
      raza: "Golden Retriever",
      edad: "1 año",
      ciudad: "Lima",
      imagen:
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      nombre: "Rocky",
      raza: "Pastor Alemán",
      edad: "3 años",
      ciudad: "Callao",
      imagen:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      nombre: "Nala",
      raza: "Mestiza",
      edad: "8 meses",
      ciudad: "Surco",
      imagen:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <main className="bg-zinc-50 min-h-screen">

      {/* HERO */}

      <section className="relative h-screen flex items-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1800&q=80"
          className="absolute w-full h-full object-cover brightness-50"
          alt=""
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

          <div className="max-w-2xl">

            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">
              🐾 Plataforma de adopción responsable
            </span>

            <h1 className="text-white text-6xl font-black mt-8 leading-tight">

              Encuentra un amigo

              <span className="block text-amber-300">

                para toda la vida

              </span>

            </h1>

            <p className="text-white/80 text-xl mt-6 leading-relaxed">

              Cada mascota merece una segunda oportunidad.
              Descubre cientos de perros y gatos esperando
              una familia llena de amor.

            </p>

            <div className="flex gap-4 mt-10">

              <button
                onClick={() => navigate("/mascotas")}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 transition"
              >
                Ver Mascotas

                <ArrowRight size={20} />

              </button>

              <button
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl hover:bg-white/30 transition"
              >
                Conocer más
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* BUSCADOR */}

      <section className="-mt-16 relative z-20">

        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

          <div className="grid md:grid-cols-4 gap-5">

            <input
              className="border rounded-xl p-4 outline-none"
              placeholder="Buscar mascota..."
            />

            <select className="border rounded-xl p-4">
              <option>Perros</option>
              <option>Gatos</option>
            </select>

            <select className="border rounded-xl p-4">
              <option>Todas las edades</option>
              <option>Cachorro</option>
              <option>Adulto</option>
            </select>

            <button className="bg-orange-500 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-orange-600">

              <Search size={20} />

              Buscar

            </button>

          </div>

        </div>

      </section>

      {/* CARRUSEL */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h2 className="text-4xl font-bold">

              Mascotas destacadas

            </h2>

            <p className="text-zinc-500 mt-2">

              Ellos esperan encontrar un hogar.

            </p>

          </div>

          <button
            onClick={() => navigate("/mascotas")}
            className="text-orange-500 font-semibold"
          >
            Ver todas →
          </button>

        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={25}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {mascotas.map((pet) => (
            <SwiperSlide key={pet.id}>
              <PetCard pet={pet} />
            </SwiperSlide>
          ))}
        </Swiper>

      </section>

      {/* ================= CATEGORÍAS ================= */}

<section className="bg-white py-24">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">

      <h2 className="text-4xl font-bold">

        Encuentra tu compañero ideal

      </h2>

      <p className="text-gray-500 mt-3">

        Explora nuestras categorías más populares.

      </p>

    </div>

    <div className="grid md:grid-cols-4 gap-8">

      {[
        {
          icon: "🐶",
          titulo: "Perros",
          cantidad: "120 mascotas"
        },
        {
          icon: "🐱",
          titulo: "Gatos",
          cantidad: "85 mascotas"
        },
        {
          icon: "🐾",
          titulo: "Cachorros",
          cantidad: "40 mascotas"
        },
        {
          icon: "❤️",
          titulo: "Necesitan ayuda",
          cantidad: "30 mascotas"
        }

      ].map((item, index) => (

        <div
          key={index}
          className="bg-zinc-50 rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
        >

          <div className="text-6xl">

            {item.icon}

          </div>

          <h3 className="text-2xl font-bold mt-5">

            {item.titulo}

          </h3>

          <p className="text-gray-500 mt-2">

            {item.cantidad}

          </p>

        </div>

      ))}

    </div>

  </div>

</section>


{/* ================= BENEFICIOS ================= */}

<section className="py-24 bg-orange-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <h2 className="text-4xl font-bold">

        ¿Por qué adoptar?

      </h2>

      <p className="text-gray-500 mt-3">

        Adoptar cambia dos vidas: la de la mascota y la tuya.

      </p>

    </div>

    <div className="grid lg:grid-cols-3 gap-10">

      {[
        {
          emoji:"🏠",
          titulo:"Das un hogar",
          texto:"Brindas un lugar seguro lleno de cariño."
        },
        {
          emoji:"❤️",
          titulo:"Salvas una vida",
          texto:"Cada adopción libera espacio para rescatar otra mascota."
        },
        {
          emoji:"😊",
          titulo:"Ganas un amigo",
          texto:"Su amor será incondicional durante toda su vida."
        }

      ].map((item,index)=>(

        <div
          key={index}
          className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition"
        >

          <div className="text-5xl">

            {item.emoji}

          </div>

          <h3 className="text-2xl font-bold mt-6">

            {item.titulo}

          </h3>

          <p className="text-gray-500 mt-4 leading-7">

            {item.texto}

          </p>

        </div>

      ))}

    </div>

  </div>

</section>


{/* ================= PASOS ================= */}

<section className="py-24">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center mb-16">

<h2 className="text-4xl font-bold">

¿Cómo adoptar?

</h2>

<p className="text-gray-500 mt-3">

Solo sigue estos sencillos pasos.

</p>

</div>

<div className="grid lg:grid-cols-4 gap-8">

{[
{
numero:"1",
titulo:"Busca",
texto:"Explora todas las mascotas disponibles."
},
{
numero:"2",
titulo:"Solicita",
texto:"Completa tu solicitud de adopción."
},
{
numero:"3",
titulo:"Entrevista",
texto:"Nuestro equipo revisará tu solicitud."
},
{
numero:"4",
titulo:"Adopta",
texto:"Conoce a tu nuevo mejor amigo."
}

].map((item,index)=>(

<div
key={index}
className="text-center"
>

<div className="w-20 h-20 rounded-full bg-orange-500 text-white text-3xl font-bold flex justify-center items-center mx-auto">

{item.numero}

</div>

<h3 className="text-2xl font-bold mt-6">

{item.titulo}

</h3>

<p className="text-gray-500 mt-3">

{item.texto}

</p>

</div>

))}

</div>

</div>

</section>


{/* ================= ESTADÍSTICAS ================= */}

<section className="bg-orange-500 py-20 text-white">

<div className="max-w-7xl mx-auto px-6">

<div className="grid md:grid-cols-4 gap-10 text-center">

<div>

<h2 className="text-5xl font-black">

250+

</h2>

<p className="mt-3">

Mascotas adoptadas

</p>

</div>

<div>

<h2 className="text-5xl font-black">

500+

</h2>

<p className="mt-3">

Mascotas rescatadas

</p>

</div>

<div>

<h2 className="text-5xl font-black">

98%

</h2>

<p className="mt-3">

Adopciones exitosas

</p>

</div>

<div>

<h2 className="text-5xl font-black">

35

</h2>

<p className="mt-3">

Voluntarios

</p>

</div>

</div>

</div>

</section>
{/* ================= TESTIMONIOS ================= */}

<section className="py-24 bg-zinc-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <h2 className="text-4xl font-bold">

        Historias que inspiran

      </h2>

      <p className="text-gray-500 mt-3">

        Familias que encontraron a su mejor amigo.

      </p>

    </div>

    <div className="grid lg:grid-cols-3 gap-8">

      {[
        {
          nombre:"María Gómez",
          mascota:"Max",
          comentario:"Adoptar a Max fue una de las mejores decisiones de nuestra familia. Hoy llena nuestro hogar de alegría."
        },
        {
          nombre:"Carlos Pérez",
          mascota:"Luna",
          comentario:"El proceso fue sencillo y transparente. Luna se adaptó muy rápido y ahora es parte de nuestra vida."
        },
        {
          nombre:"Ana Torres",
          mascota:"Rocky",
          comentario:"Gracias al albergue encontramos un compañero increíble. Recomiendo adoptar antes que comprar."
        }

      ].map((item,index)=>(

        <div
          key={index}
          className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300"
        >

          <div className="flex text-yellow-400 text-xl mb-4">

            ⭐⭐⭐⭐⭐

          </div>

          <p className="text-gray-600 leading-7">

            "{item.comentario}"

          </p>

          <div className="mt-8">

            <h4 className="font-bold text-lg">

              {item.nombre}

            </h4>

            <span className="text-orange-500">

              Adoptó a {item.mascota}

            </span>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>


{/* ================= CTA ================= */}

<section className="relative py-32 overflow-hidden">

  <img

    src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1800&q=80"

    alt=""

    className="absolute inset-0 w-full h-full object-cover"

  />

  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative max-w-5xl mx-auto text-center px-6">

    <h2 className="text-5xl font-black text-white">

      Dale una segunda oportunidad.

    </h2>

    <p className="text-white/80 text-xl mt-6 max-w-2xl mx-auto">

      Cada mascota espera una familia que le brinde amor,
      protección y un hogar para siempre.

    </p>

    <button

      onClick={() => navigate("/mascotas")}

      className="mt-10 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition"

    >

      Ver Mascotas

    </button>

  </div>

</section>


{/* ================= FOOTER ================= */}

<footer className="bg-zinc-900 text-white">

  <div className="max-w-7xl mx-auto px-6 py-16">

    <div className="grid md:grid-cols-4 gap-10">

      <div>

        <h3 className="text-3xl font-bold">

          🐾 Can Martín

        </h3>

        <p className="text-zinc-400 mt-5 leading-7">

          Plataforma dedicada a conectar mascotas rescatadas
          con familias responsables que desean adoptar.

        </p>

      </div>

      <div>

        <h4 className="font-bold text-xl mb-5">

          Navegación

        </h4>

        <ul className="space-y-3 text-zinc-400">

          <li className="hover:text-white cursor-pointer">

            Inicio

          </li>

          <li className="hover:text-white cursor-pointer">

            Mascotas

          </li>

          <li className="hover:text-white cursor-pointer">

            Adopciones

          </li>

          <li className="hover:text-white cursor-pointer">

            Contacto

          </li>

        </ul>

      </div>

      <div>

        <h4 className="font-bold text-xl mb-5">

          Contacto

        </h4>

        <ul className="space-y-3 text-zinc-400">

          <li>

            📍 Lima, Perú

          </li>

          <li>

            📞 +51 999 999 999

          </li>

          <li>

            ✉ contacto@canmartin.com

          </li>

        </ul>

      </div>

      <div>

        <h4 className="font-bold text-xl mb-5">

          Síguenos

        </h4>

        <div className="flex gap-4 text-3xl">

          <span className="cursor-pointer hover:scale-110 transition">

            📘

          </span>

          <span className="cursor-pointer hover:scale-110 transition">

            📷

          </span>

          <span className="cursor-pointer hover:scale-110 transition">

            🐦

          </span>

        </div>

      </div>

    </div>

    <div className="border-t border-zinc-700 mt-12 pt-8 text-center text-zinc-500">

      © 2026 Can Martín · Todos los derechos reservados.

    </div>

  </div>

</footer>

    </main>
  );
}

function PetCard({ pet }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group">

      <div className="overflow-hidden">

        <img
          src={pet.imagen}
          alt={pet.nombre}
          className="h-80 w-full object-cover group-hover:scale-110 duration-500"
        />

      </div>

      <div className="p-6">

        <div className="flex justify-between">

          <div>

            <h3 className="text-2xl font-bold">

              {pet.nombre}

            </h3>

            <p className="text-zinc-500">

              {pet.raza}

            </p>

          </div>

          <button className="w-12 h-12 rounded-full bg-orange-100 flex justify-center items-center">

            <Heart size={20} className="text-orange-500" />

          </button>

        </div>

        <div className="flex items-center gap-2 text-zinc-500 mt-4">

          <MapPin size={16} />

          {pet.ciudad}

        </div>

        <div className="mt-2 text-zinc-500">

          {pet.edad}

        </div>

        <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-semibold">

          Ver Perfil

        </button>

      </div>

    </div>
  );
}

export default Home;