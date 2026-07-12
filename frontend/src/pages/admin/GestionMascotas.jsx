import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  PawPrint,
  Dog,
  Cat,
  Pencil,
  Trash2,
  BadgeCheck,
} from "lucide-react";

import {
  obtenerTodasLasMascotas,
  registrarMascota,
  actualizarMascota,
  eliminarMascota,
} from "../../services/mascotaService";

const initialForm = {
  nombre: "",
  especie: "PERRO",
  edad: "",
  estado: "DISPONIBLE",
  raza: "",
  sexo: "MACHO",
  tamanio: "MEDIANO",
  fechaIngreso: "",
  foto: "",
  descripcion: "",
};

function GestionMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [filtroEspecie, setFiltroEspecie] = useState("TODOS");

  useEffect(() => {
    cargarMascotas();
  }, []);

  const cargarMascotas = async () => {
    try {
      const data = await obtenerTodasLasMascotas();
      setMascotas(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error al cargar mascotas:", e);
    }
  };

  const mascotasFiltradas = useMemo(() => {
    return mascotas.filter((m) => {
      const coincideNombre = m.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEspecie = filtroEspecie === "TODOS" || m.especie === filtroEspecie;
      const coincideEstado = filtroEstado === "TODOS" || m.estado === filtroEstado;
      return coincideNombre && coincideEspecie && coincideEstado;
    });
  }, [mascotas, busqueda, filtroEstado, filtroEspecie]);

  const openModal = (m = null) => {
    setEditingId(m ? m.id : null);
    setForm(m ? { ...m } : initialForm);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await actualizarMascota(editingId, form);
      } else {
        await registrarMascota(form);
      }
      setIsModalOpen(false);
      cargarMascotas();
    } catch (e) {
      console.error(e);
      alert("Ocurrió un error al guardar.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-12">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center">
                <PawPrint size={34} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-white">Gestión de Mascotas</h1>
                <p className="text-orange-100 mt-2">Administra el catálogo del albergue.</p>
              </div>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-white text-orange-600 font-bold px-7 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl flex items-center gap-3"
            >
              <Plus size={22} /> Nueva Mascota
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* ESTADISTICAS */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard icon={<Dog size={34} />} titulo="Perros" valor={mascotas.filter((m) => m.especie === "PERRO").length} color="orange" />
          <StatCard icon={<Cat size={34} />} titulo="Gatos" valor={mascotas.filter((m) => m.especie === "GATO").length} color="blue" />
          <StatCard icon={<BadgeCheck size={34} />} titulo="Disponibles" valor={mascotas.filter((m) => m.estado === "DISPONIBLE").length} color="green" />
        </div>

        {/* BUSCADOR */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input type="text" placeholder="Buscar mascota..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full border rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <select value={filtroEspecie} onChange={(e) => setFiltroEspecie(e.target.value)} className="border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500">
              <option value="TODOS">Todas las especies</option>
              <option value="PERRO">Perros</option>
              <option value="GATO">Gatos</option>
              <option value="OTRO">Otros</option>
            </select>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500">
              <option value="TODOS">Todos los estados</option>
              <option value="DISPONIBLE">Disponible</option>
              <option value="ADOPTADO">Adoptado</option>
            </select>
          </div>
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {mascotasFiltradas.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl p-16 text-center shadow-sm">
              <PawPrint size={70} className="mx-auto text-orange-400 mb-5" />
              <h2 className="text-2xl font-bold text-slate-700">No se encontraron mascotas</h2>
            </div>
          ) : (
            mascotasFiltradas.map((m) => (
              <div key={m.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img src={m.foto || "https://via.placeholder.com/500x350?text=Mascota"} alt={m.nombre} className="w-full h-64 object-cover" />
                  <span className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-bold shadow-lg ${m.estado === "DISPONIBLE" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {m.estado}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-slate-800">{m.nombre}</h2>
                  <p className="text-slate-500">{m.raza}</p>
                  <div className="flex gap-3 mt-7">
                    <button onClick={() => openModal(m)} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2">
                      <Pencil size={18} /> Editar
                    </button>
                    <button onClick={() => { if (window.confirm(`¿Eliminar a ${m.nombre}?`)) eliminarMascota(m.id).then(cargarMascotas); }} className="w-14 rounded-xl bg-red-500 hover:bg-red-600 text-white flex justify-center items-center">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editingId ? "Editar" : "Registrar"} Mascota</h2>
            <div className="space-y-4">
                {/* Agrega aquí tus campos de formulario */}
                <input className="w-full border p-3 rounded-xl" placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
                {/* ... resto de campos ... */}
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl">Cancelar</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-orange-600 text-white rounded-xl">Guardar</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componentes auxiliares (StatCard, etc) se mantienen igual
function StatCard({ icon, titulo, valor, color }) {
    const colors = { orange: "from-orange-400 to-orange-600", blue: "from-sky-400 to-blue-600", green: "from-emerald-400 to-emerald-600" };
    return (
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
            <div>
                <p className="text-slate-500">{titulo}</p>
                <h2 className="text-4xl font-extrabold">{valor}</h2>
            </div>
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white`}>{icon}</div>
        </div>
    );
}

export default GestionMascotas;