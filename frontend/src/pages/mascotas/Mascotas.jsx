import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importa esto
import { obtenerMascotasDisponibles } from '../../services/mascotaService';
import DetalleMascota from "./DetalleMascota";

function Mascotas({ setMascotaSeleccionadaGlobal }) {
  const navigate = useNavigate(); // 2. Inicializa el hook
  const [mascotas, setMascotas] = useState([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  
  const [busqueda, setBusqueda] = useState('');
  const [filtroEspecie, setFiltroEspecie] = useState('');
  const [filtroRaza, setFiltroRaza] = useState('');
  const [filtroTamano, setFiltroTamano] = useState('');

  useEffect(() => { cargarMascotas(); }, []);

  const cargarMascotas = async () => {
    try {
      const data = await obtenerMascotasDisponibles();
      setMascotas(data);
    } catch (error) { console.error("Error al cargar:", error); }
  };

  const mascotasFiltradas = mascotas.filter(m => 
    m.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (filtroEspecie === '' || m.especie === filtroEspecie) &&
    (filtroRaza === '' || m.raza === filtroRaza) &&
    (filtroTamano === '' || m.tamanio === filtroTamano)
  );

  // 3. Lógica mejorada al solicitar adopción
  const handleSolicitarAdopcion = (mascota) => {
    setMascotaSeleccionadaGlobal(mascota); // Guarda en App.jsx
    navigate('/adopcion'); // Navega a la ruta del formulario
  };

  if (mascotaSeleccionada) {
    return (
      <DetalleMascota 
        mascota={mascotaSeleccionada} 
        onVolver={() => setMascotaSeleccionada(null)} 
        onSolicitarAdopcion={handleSolicitarAdopcion} // Usa la nueva función
      />
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1e293b' }}>🐾 Encuentra a tu compañero ideal</h2>

      <div style={{ 
        background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '30px',
        display: 'flex', gap: '15px', flexWrap: 'wrap', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <input placeholder="🔍 Buscar por nombre..." onChange={e => setBusqueda(e.target.value)} style={{flex: '1', minWidth: '200px', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1'}} />
        <select onChange={e => setFiltroEspecie(e.target.value)} style={{padding: '10px', borderRadius: '6px'}}>
          <option value="">Todas las Especies</option>
          <option value="PERRO">Perro</option>
          <option value="GATO">Gato</option>
          <option value="OTRO">Otro</option>
        </select>
        <select onChange={e => setFiltroRaza(e.target.value)} style={{padding: '10px', borderRadius: '6px'}}>
          <option value="">Todas las Razas</option>
          {[...new Set(mascotas.map(m => m.raza))].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select onChange={e => setFiltroTamano(e.target.value)} style={{padding: '10px', borderRadius: '6px'}}>
          <option value="">Todos los Tamaños</option>
          <option value="PEQUENIO">Pequeño</option>
          <option value="MEDIANO">Mediano</option>
          <option value="GRANDE">Grande</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {mascotasFiltradas.map((m) => (
          <div key={m.id} style={{ 
            background: 'white', borderRadius: '20px', overflow: 'hidden', 
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', transition: 'transform 0.3s'
          }}>
            <img src={m.foto || 'https://via.placeholder.com/300'} alt={m.nombre} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: '0' }}>{m.nombre}</h3>
                <span style={{ fontSize: '12px', background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px' }}>{m.tamanio}</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '10px 0' }}>{m.especie} • {m.raza}</p>
              <button 
                onClick={() => setMascotaSeleccionada(m)}
                style={{ 
                  width: '100%', padding: '12px', background: '#3b82f6', color: 'white', 
                  border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
                }}>
                Ver más información
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mascotas;