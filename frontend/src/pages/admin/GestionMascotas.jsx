import React, { useEffect, useState, useMemo } from "react";
import { obtenerTodasLasMascotas, registrarMascota, actualizarMascota } from "../../services/mascotaService";

const GestionMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [orden, setOrden] = useState("reciente"); 
  const [form, setForm] = useState({
    nombre: "", especie: "PERRO", edad: "", estado: "DISPONIBLE",
    raza: "", sexo: "MACHO", tamanio: "MEDIANO", foto: "", descripcion: ""
  });

  useEffect(() => { cargarMascotas(); }, []);

  const mostrarNotificacion = (mensaje) => {
    setToast({ show: true, message: mensaje });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "Fecha no disponible";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const cargarMascotas = async () => {
    const data = await obtenerTodasLasMascotas();
    setMascotas(data);
  };

  const mascotasFiltradas = useMemo(() => {
    let filtradas = mascotas.filter(m => filtroEstado === "" || m.estado === filtroEstado);
    
    return filtradas.sort((a, b) => {
      const fechaA = new Date(a.fechaCreacion || 0);
      const fechaB = new Date(b.fechaCreacion || 0);
      return orden === "reciente" ? fechaB - fechaA : fechaA - fechaB;
    });
  }, [mascotas, filtroEstado, orden]);

  const handleSave = async () => {
    let mascotaParaEnviar = { ...form };

    // Lógica de limpieza: quita campos vacíos para no enviar strings vacíos al backend
    const datosLimpios = {};
    Object.keys(mascotaParaEnviar).forEach(key => {
        if (mascotaParaEnviar[key] !== "" && mascotaParaEnviar[key] !== null && mascotaParaEnviar[key] !== undefined) {
            datosLimpios[key] = mascotaParaEnviar[key];
        }
    });

    // Conversión de edad a número
    if (datosLimpios.edad) {
        datosLimpios.edad = parseInt(datosLimpios.edad);
    }

    try {
      if (editingId) {
        await actualizarMascota(editingId, datosLimpios);
        mostrarNotificacion(`✅ Mascota editada correctamente`);
      } else {
        await registrarMascota(datosLimpios);
        mostrarNotificacion(`🎉 Mascota creada correctamente`);
      }
      
      // FORZAR ACTUALIZACIÓN: carga los datos nuevos antes de cerrar el modal
      await cargarMascotas(); 
      setIsModalOpen(false);
    } catch (error) { 
      console.error("Detalle del error:", error.response?.data || error);
      alert("Error al guardar. Revisa la consola para más detalles."); 
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🐾 Gestión de Mascotas</h1>
        <button onClick={() => { 
          setForm({ nombre: "", especie: "PERRO", edad: "", estado: "DISPONIBLE", raza: "", sexo: "MACHO", tamanio: "MEDIANO", foto: "", descripcion: "" }); 
          setEditingId(null); 
          setIsModalOpen(true); 
        }} style={styles.btnPrimary}>+ Nueva Mascota</button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select style={styles.filter} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="DISPONIBLE">Disponible</option>
          <option value="EN_PROCESO">En Proceso</option>
          <option value="ADOPTADO">Adoptado</option>
          <option value="SUSPENDIDO">Suspendido</option>
        </select>
        <select style={styles.filter} onChange={(e) => setOrden(e.target.value)}>
          <option value="reciente">Más reciente primero</option>
          <option value="antiguo">Más antiguo primero</option>
        </select>
      </div>

      <div style={styles.grid}>
        {mascotasFiltradas.map((m) => (
          <div key={m.id} style={styles.card}>
            <img src={m.foto || "https://via.placeholder.com/280"} alt={m.nombre} style={styles.img} />
            <div style={styles.cardBody}>
              <h3 style={{margin: '0 0 5px 0'}}>{m.nombre}</h3>
              <p style={{fontSize: '13px', color: '#666', marginBottom: '10px'}}>{m.especie} • {m.raza}</p>
              <span style={styles.statusBadge(m.estado)}>{m.estado ? m.estado.replace('_', ' ') : 'N/A'}</span>
              <p style={{fontSize: '11px', color: '#94a3b8', marginTop: '8px'}}>
                Publicado: {formatearFecha(m.fechaCreacion)}
              </p>
              <div style={styles.cardActions}>
                <button onClick={() => { setForm(m); setEditingId(m.id); setIsModalOpen(true); }} style={styles.btnIcon}>✏️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast.show && (
        <div style={styles.toast}><span>{toast.message}</span></div>
      )}

      {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>{editingId ? "Editar Mascota" : "Registrar Mascota"}</h2>
            <div style={styles.formGrid}>
              <input style={styles.input} placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
              <select style={styles.input} value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
                <option value="DISPONIBLE">Disponible</option>
                <option value="EN_PROCESO">En Proceso</option>
                <option value="ADOPTADO">Adoptado</option>
                <option value="SUSPENDIDO">Suspendido</option>
              </select>
              <select style={styles.input} value={form.tamanio} onChange={e => setForm({...form, tamanio: e.target.value})}>
                <option value="PEQUENIO">Pequeño</option>
                <option value="MEDIANO">Mediano</option>
                <option value="GRANDE">Grande</option>
              </select>
              <select style={styles.input} value={form.especie} onChange={e => setForm({...form, especie: e.target.value})}>
                <option value="PERRO">Perro</option>
                <option value="GATO">Gato</option>
                <option value="OTRO">Otro</option>
              </select>
              <input style={styles.input} placeholder="Raza" value={form.raza} onChange={e => setForm({...form, raza: e.target.value})} />
              <input style={styles.input} placeholder="Edad" value={form.edad} onChange={e => setForm({...form, edad: e.target.value})} />
              <select style={styles.input} value={form.sexo} onChange={e => setForm({...form, sexo: e.target.value})}>
                <option value="MACHO">Macho</option>
                <option value="HEMBRA">Hembra</option>
              </select>
              <input style={{...styles.input, gridColumn: 'span 2'}} placeholder="URL Foto" value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} />
              <textarea style={{...styles.input, gridColumn: 'span 2', height: '80px'}} placeholder="Descripción" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} />
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setIsModalOpen(false)} style={styles.btnSecondary}>Cancelar</button>
              <button onClick={handleSave} style={styles.btnPrimary}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Estilos ---
const styles = {};
styles.container = { padding: '40px', maxWidth: '1100px', margin: 'auto' };
styles.header = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' };
styles.grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' };
styles.card = { background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' };
styles.img = { width: '100%', height: '180px', objectFit: 'cover' };
styles.cardBody = { padding: '20px' };
styles.cardActions = { marginTop: '15px', display: 'flex', justifyContent: 'flex-end' };
styles.statusBadge = (st) => ({ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', background: st === 'DISPONIBLE' ? '#dcfce7' : st === 'ADOPTADO' ? '#dbeafe' : st === 'EN_PROCESO' ? '#fef3c7' : '#fee2e2' });
styles.modal = { background: 'white', padding: '40px', borderRadius: '24px', width: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' };
styles.overlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
styles.formGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' };
styles.input = { padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px' };
styles.btnPrimary = { background: '#0f172a', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' };
styles.btnSecondary = { background: '#f1f5f9', border: 'none', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer' };
styles.modalFooter = { marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '10px' };
styles.filter = { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '20px' };
styles.btnIcon = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' };
styles.toast = { position: 'fixed', bottom: '20px', right: '20px', background: '#0f172a', color: 'white', padding: '16px 24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 9999 };

export default GestionMascotas;