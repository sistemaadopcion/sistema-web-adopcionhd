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

  // Función para formatear la fecha a un formato legible
  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "Fecha no disponible";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

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
      const coincideEspecie = especie === '' || m.especie.toUpperCase() === especie.toUpperCase();
      return coincideBusqueda && coincideEspecie;
    });
  }, [mascotas, busqueda, especie]);

  if (mascotaSeleccionada) {
    return (
      <DetalleMascota 
        mascota={mascotaSeleccionada} 
        onVolver={() => setMascotaSeleccionada(null)} 
        onSolicitarAdopcion={(m) => { 
          setMascotaSeleccionadaGlobal(m); 
          // 🎯 AQUÍ ESTÁ EL CAMBIO CLAVE: Pasamos el id de la mascota en la URL
          navigate(`/adopcion/${m.id}`); 
        }} 
      />
    );
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
                
                {/* Visualización de la fecha de publicación */}
                <p style={{fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px', marginTop: '-15px'}}>
                  Disponible desde: {formatearFecha(m.fechaCreacion)}
                </p>

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
  pageContainer: { padding: '40px 20px', maxWidth: '1200px', margin: 'auto' },
  header: { marginBottom: '40px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' },
  title: { fontSize: '2.5rem', margin: '0 0 10px', color: '#0f172a' },
  subtitle: { color: '#64748b', margin: 0, fontSize: '1.1rem' },
  filterBar: { display: 'flex', gap: '15px', marginBottom: '40px' },
  input: { padding: '12px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', flex: 1, fontSize: '1rem' },
  select: { padding: '12px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' },
  card: { background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' },
  imageWrapper: { height: '280px', overflow: 'hidden' },
  image: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' },
  cardContent: { padding: '25px' },
  badge: { fontSize: '0.8rem', background: '#f8fafc', padding: '6px 12px', borderRadius: '8px', color: '#475569', fontWeight: '600', border: '1px solid #e2e8f0' },
  petName: { margin: '15px 0 5px', fontSize: '1.5rem', color: '#0f172a' },
  petInfo: { fontSize: '1rem', color: '#64748b', marginBottom: '20px' },
  button: { width: '100%', padding: '14px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' },
  emptyState: { textAlign: 'center', padding: '60px', color: '#94a3b8', fontSize: '1.2rem' },
  loader: { textAlign: 'center', marginTop: '60px', fontSize: '1.2rem' }
};

export default Mascotas;