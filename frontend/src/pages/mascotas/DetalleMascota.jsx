import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importar useNavigate
import { Users, HandHeart, X } from 'lucide-react';

function DetalleMascota({ mascota, onVolver, onSolicitarAdopcion }) {
  const [modalContenido, setModalContenido] = useState(null);
  const navigate = useNavigate(); // 2. Inicializar navigate

  if (!mascota) return null;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Segoe UI', sans-serif" }}>
      
      <button onClick={onVolver} style={styles.btnVolver}>← Regresar al catálogo</button>

      <div style={styles.grid}>
        {/* Columna 1: Imagen */}
        <div style={styles.imgContainer}>
          <img src={mascota.foto || 'https://via.placeholder.com/600'} alt={mascota.nombre} style={styles.mainImg} />
        </div>

        {/* Columna 2: Info */}
        <div style={styles.infoCol}>
          <div>
            <h1 style={styles.title}>{mascota.nombre}</h1>
            <p style={styles.subtitle}>{mascota.especie} • {mascota.raza}</p>
          </div>

          <div style={styles.chipContainer}>
            {[mascota.tamanio, mascota.sexo, `${mascota.edad} años`].map((tag, i) => (
              <span key={i} style={styles.chip}>{tag}</span>
            ))}
          </div>

          <div style={styles.descSection}>
            <h3 style={{ color: '#0f172a' }}>Acerca de {mascota.nombre}</h3>
            <p style={styles.descText}>{mascota.descripcion || "Sin descripción disponible."}</p>
          </div>
        </div>

        {/* Columna 3: Acciones */}
        <div style={styles.actionCol}>
          <div onClick={() => setModalContenido('donacion')} style={styles.actionCard}>
            <HandHeart size={20} color="#0f172a"/>
            <span>Ayuda con donación</span>
          </div>
          <div onClick={() => setModalContenido('voluntario')} style={styles.actionCard}>
            <Users size={20} color="#0f172a"/>
            <span>Sumate como voluntario</span>
          </div>
          
          <button onClick={() => onSolicitarAdopcion(mascota)} style={styles.btnAdoptar}>
            Adoptar a {mascota.nombre} 🐾
          </button>
        </div>
      </div>

      {/* Modal de Información */}
      {modalContenido && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button onClick={() => setModalContenido(null)} style={styles.closeBtn}><X /></button>
            {modalContenido === 'donacion' ? (
              <>
                <h2>🤝 Ayudá con tu donación</h2>
                <p>Tu aporte sostiene nuestro trabajo diario y el bienestar de los animales.</p>
                <ul style={styles.list}>
                  <li>Donación única o mensual.</li>
                  <li>Monto libre.</li>
                  <li>Puedes realizarlo mediante transferencia o QR.</li>
                </ul>
                {/* 3. Navegación con navigate */}
                <button onClick={() => navigate("/donaciones")} style={styles.btnPrimary}>Ir a donar</button>
              </>
            ) : (
              <>
                <h2>👤 Requisitos para Voluntarix</h2>
                <p>Colaborarás en tareas diarias y cuidado de los animales.</p>
                <ul style={styles.list}>
                  <li>Respeto y empatía con los animales.</li>
                  <li>Mayoría de edad (18+).</li>
                  <li>Compromiso y constancia semanal.</li>
                </ul>
                {/* 3. Navegación con navigate */}
                <button onClick={() => navigate("/voluntariado")} style={styles.btnPrimary}>Completar formulario</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  btnVolver: { marginBottom: '30px', padding: '10px 20px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '50px', cursor: 'pointer', fontWeight: '500' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: '40px', alignItems: 'start' },
  imgContainer: { borderRadius: '30px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' },
  mainImg: { width: '100%', height: '500px', objectFit: 'cover' },
  infoCol: { display: 'flex', flexDirection: 'column', gap: '25px' },
  title: { fontSize: '3rem', margin: '0', color: '#0f172a' },
  subtitle: { color: '#64748b', fontSize: '1.1rem', textTransform: 'uppercase' },
  chipContainer: { display: 'flex', gap: '10px' },
  chip: { padding: '8px 16px', borderRadius: '12px', background: '#f8fafc', color: '#475569', fontWeight: '600', fontSize: '0.85rem', border: '1px solid #e2e8f0' },
  descSection: { borderTop: '1px solid #f1f5f9', paddingTop: '20px' },
  descText: { color: '#475569', lineHeight: '1.7' },
  actionCol: { display: 'flex', flexDirection: 'column', gap: '15px' },
  actionCard: { padding: '20px', border: '1px solid #e2e8f0', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', background: '#fff', transition: '0.3s' },
  btnAdoptar: { marginTop: '10px', padding: '18px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: 'bold' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', padding: '40px', borderRadius: '24px', width: '400px', position: 'relative' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', cursor: 'pointer' },
  btnPrimary: { background: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginTop: '20px', width: '100%' },
  list: { paddingLeft: '20px', color: '#475569' }
};

export default DetalleMascota;