import React, { useEffect, useState } from 'react';
import { obtenerTodasLasMascotas, registrarMascota, actualizarMascota, eliminarMascota } from '../../services/mascotaService';

const GestionMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = { 
    nombre: '', especie: 'PERRO', edad: '', estado: 'DISPONIBLE', 
    raza: '', sexo: 'MACHO', tamanio: 'MEDIANO', fechaIngreso: '', foto: '', descripcion: '' 
  };
  const [form, setForm] = useState(initialForm);

  useEffect(() => { cargarMascotas(); }, []);

  const cargarMascotas = async () => {
    try {
      const data = await obtenerTodasLasMascotas(); 
      setMascotas(data || []);
    } catch (error) { console.error("Error al cargar:", error); }
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
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error: Verifica los campos.");
    }
  };

  const openModal = (m = null) => {
    if (m) { 
      setEditingId(m.id); 
      setForm({...m}); 
    } else { 
      setEditingId(null); 
      setForm(initialForm); 
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm mb-8">
        <h1 className="text-3xl font-bold text-slate-800">🐾 Gestión de Mascotas</h1>
        <button onClick={() => openModal()} className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition">
          + Nueva Mascota
        </button>
      </div>

      {/* GRID DE MASCOTAS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotas.map((m) => (
          <div key={m.id} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition border border-slate-200">
            <img src={m.foto || 'https://via.placeholder.com/280'} alt={m.nombre} className="w-full h-48 object-cover rounded-2xl mb-4" />
            <h3 className="text-xl font-bold">{m.nombre}</h3>
            <p className="text-sm text-slate-500">{m.especie} • {m.raza} • {m.sexo}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${m.estado === 'DISPONIBLE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {m.estado}
              </span>
              <div className="flex gap-2">
                <button onClick={() => openModal(m)} className="p-2 hover:bg-slate-100 rounded-lg">✏️</button>
                <button onClick={() => {if(window.confirm("¿Borrar?")) eliminarMascota(m.id).then(cargarMascotas)}} className="p-2 hover:bg-slate-100 rounded-lg">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Editar Mascota' : 'Registrar Mascota'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Nombre" className="p-3 border rounded-xl" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
              <select className="p-3 border rounded-xl" value={form.especie} onChange={e => setForm({...form, especie: e.target.value})}>
                <option value="PERRO">Perro</option><option value="GATO">Gato</option><option value="OTRO">Otro</option>
              </select>
              <input placeholder="Raza" className="p-3 border rounded-xl" value={form.raza} onChange={e => setForm({...form, raza: e.target.value})} />
              <input placeholder="Edad" className="p-3 border rounded-xl" value={form.edad} onChange={e => setForm({...form, edad: e.target.value})} />
              <select className="p-3 border rounded-xl" value={form.sexo} onChange={e => setForm({...form, sexo: e.target.value})}>
                <option value="MACHO">Macho</option><option value="HEMBRA">Hembra</option>
              </select>
              <select className="p-3 border rounded-xl" value={form.tamanio} onChange={e => setForm({...form, tamanio: e.target.value})}>
                <option value="PEQUENIO">Pequeño</option><option value="MEDIANO">Mediano</option><option value="GRANDE">Grande</option>
              </select>
              <input type="date" className="p-3 border rounded-xl" value={form.fechaIngreso} onChange={e => setForm({...form, fechaIngreso: e.target.value})} />
              <select className="p-3 border rounded-xl" value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
                <option value="DISPONIBLE">Disponible</option><option value="ADOPTADO">Adoptado</option>
              </select>
              <input placeholder="URL Foto" className="p-3 border rounded-xl col-span-2" value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} />
            </div>
            <textarea placeholder="Descripción" className="w-full mt-4 p-3 border rounded-xl" rows="3" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-xl">Cancelar</button>
              <button onClick={handleSave} className="px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionMascotas;