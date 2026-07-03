import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerMascotasDisponibles } from '../../services/mascotaService';
import DetalleMascota from "./DetalleMascota";

function Mascotas({ setMascotaSeleccionadaGlobal }) {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [especie, setEspecie] = useState('');

  useEffect(() => {
    cargarMascotas();
  }, []);

  const cargarMascotas = async () => {
    try {
      setLoading(true);
      const data = await obtenerMascotasDisponibles();
      setMascotas(data);
    } catch (error) { console.error("Error:", error); }
    finally { setLoading(false); }
  };

  const mascotasFiltradas = useMemo(() => {
    return mascotas.filter(m => {
      const coincideBusqueda = m.nombre.toLowerCase().includes(busqueda.toLowerCase());
      // Aseguramos que el filtro de especie sea preciso
      const coincideEspecie = especie === '' || m.especie.toUpperCase() === especie.toUpperCase();
      return coincideBusqueda && coincideEspecie;
    });
  }, [mascotas, busqueda, especie]);

  if (loading) return <div style={styles.loader}>Cargando... 🐾</div>;

  if (mascotaSeleccionada) {
    return <DetalleMascota mascota={mascotaSeleccionada} onVolver={() => setMascotaSeleccionada(null)} onSolicitarAdopcion={(m) => { setMascotaSeleccionadaGlobal(m); navigate('/adopcion'); }} />;
  }

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Nuestros rescatados</h1>
        <p style={styles.subtitle}>Encuentra un compañero de vida</p>
      </header>

      <div style={styles.filterBar}>
        <input 
          placeholder="Buscar por nombre..." 
          onChange={e => setBusqueda(e.target.value)} 
          style={styles.input} 
        />
        <select onChange={e => setEspecie(e.target.value)} style={styles.select}>
          <option value="">Todas las especies</option>
          <option value="PERRO">Perros</option>
          <option value="GATO">Gatos</option>
        </select>
      </div>

      {mascotasFiltradas.length > 0 ? (
        <div style={styles.grid}>
          {mascotasFiltradas.map((m) => (
            <div key={m.id} style={styles.card}>
              <div style={styles.imageWrapper}>
                <img src={m.foto} alt={m.nombre} style={styles.image} />
              </div>
              <div style={styles.cardContent}>
                <span style={styles.badge}>{m.tamanio}</span>
                <h3 style={styles.petName}>{m.nombre}</h3>
                <p style={styles.petInfo}>{m.especie} • {m.raza}</p>
                <button onClick={() => setMascotaSeleccionada(m)} style={styles.button}>
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>No se encontraron mascotas con esos filtros.</div>
      )}
    </div>
  );
}

const styles = {
  pageContainer: { padding: '20px', maxWidth: '1100px', margin: 'auto' },
  header: { marginBottom: '30px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' },
  title: { fontSize: '1.8rem', margin: '0 0 5px' },
  subtitle: { color: '#64748b', margin: 0 },
  filterBar: { display: 'flex', gap: '10px', marginBottom: '30px' },
  input: { padding: '10px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', flex: 1 },
  select: { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
  card: { background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', transition: 'transform 0.2s' },
  imageWrapper: { height: '180px' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  cardContent: { padding: '15px' },
  badge: { fontSize: '0.7rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' },
  petName: { margin: '10px 0 5px', fontSize: '1.2rem' },
  petInfo: { fontSize: '0.85rem', color: '#64748b', marginBottom: '15px' },
  button: { width: '100%', padding: '10px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '50px', color: '#94a3b8' },
  loader: { textAlign: 'center', marginTop: '50px' }
};

export default Mascotas;