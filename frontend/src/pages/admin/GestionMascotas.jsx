import React, { useEffect, useState } from 'react';
import { obtenerTodasLasMascotas, registrarMascota, actualizarMascota, eliminarMascota } from '../../services/mascotaService';

const GestionMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // ESTADO CORREGIDO: 'tamanio' coincide con tu atributo en Java
  const [form, setForm] = useState({ 
    nombre: '', especie: 'PERRO', edad: '', estado: 'DISPONIBLE', 
    raza: '', sexo: 'MACHO', tamanio: 'MEDIANO', fechaIngreso: '', foto: '', descripcion: '' 
  });

  useEffect(() => { cargarMascotas(); }, []);

  const cargarMascotas = async () => {
    try {
      // CAMBIO: Usa el nombre correcto de la función importada
      const data = await obtenerTodasLasMascotas(); 
      setMascotas(data);
    } catch (error) { 
      console.error("Error al cargar:", error); 
    }
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
      alert("Error: Verifica que todos los campos sean correctos.");
    }
  };

  const openModal = (m = null) => {
    if (m) { 
      setEditingId(m.id); 
      setForm({...m}); 
    } else { 
      setEditingId(null); 
      setForm({ nombre: '', especie: 'PERRO', edad: '', estado: 'DISPONIBLE', raza: '', sexo: 'MACHO', tamanio: 'MEDIANO', fechaIngreso: '', foto: '', descripcion: '' }); 
    }
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🐾 Gestión de Mascotas</h1>
        <button type="button" onClick={() => openModal()} style={{ background: '#27ae60', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Nueva Mascota
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {mascotas.map((m) => (
          <div key={m.id} style={{ background: 'white', borderRadius: '15px', padding: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <img src={m.foto || 'https://via.placeholder.com/280'} alt={m.nombre} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px' }} />
            <h3 style={{ margin: '15px 0 5px' }}>{m.nombre}</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>{m.especie} • {m.raza} • {m.sexo}</p>
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ background: m.estado === 'DISPONIBLE' ? '#dcfce7' : '#fee2e2', color: m.estado === 'DISPONIBLE' ? '#166534' : '#991b1b', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{m.estado}</span>
              <div>
                <button type="button" onClick={() => openModal(m)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>✏️</button>
                <button type="button" onClick={() => {if(window.confirm("¿Borrar?")) eliminarMascota(m.id).then(cargarMascotas)}} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px', width: '500px' }}>
            <h2>{editingId ? 'Editar Mascota' : 'Registrar Mascota'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} style={{padding: '8px'}} />
              
              <select value={form.especie} onChange={e => setForm({...form, especie: e.target.value})} style={{padding: '8px'}}>
                <option value="PERRO">Perro</option>
                <option value="GATO">Gato</option>
                <option value="OTRO">Otro</option>
              </select>

              <input placeholder="Raza" value={form.raza} onChange={e => setForm({...form, raza: e.target.value})} style={{padding: '8px'}} />
              <input placeholder="Edad" value={form.edad} onChange={e => setForm({...form, edad: e.target.value})} style={{padding: '8px'}} />
              
              <select value={form.sexo} onChange={e => setForm({...form, sexo: e.target.value})} style={{padding: '8px'}}>
                <option value="MACHO">Macho</option>
                <option value="HEMBRA">Hembra</option>
              </select>

              <select value={form.tamanio} onChange={e => setForm({...form, tamanio: e.target.value})} style={{padding: '8px'}}>
                <option value="PEQUENIO">Pequeño</option>
                <option value="MEDIANO">Mediano</option>
                <option value="GRANDE">Grande</option>
              </select>

              <input type="date" value={form.fechaIngreso} onChange={e => setForm({...form, fechaIngreso: e.target.value})} style={{padding: '8px'}} />
              
              <select value={form.estado} onChange={e => setForm({...form, estado: e.target.value})} style={{padding: '8px'}}>
                <option value="DISPONIBLE">Disponible</option>
                <option value="ADOPTADO">Adoptado</option>
              </select>

              <input placeholder="URL Foto" value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} style={{padding: '8px', gridColumn: 'span 2'}} />
            </div>
            <textarea placeholder="Descripción" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} style={{ width: '100%', marginTop: '15px', padding: '8px', boxSizing: 'border-box' }} rows="3" />
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 16px' }}>Cancelar</button>
              <button type="button" onClick={handleSave} style={{ background: '#27ae60', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionMascotas; 