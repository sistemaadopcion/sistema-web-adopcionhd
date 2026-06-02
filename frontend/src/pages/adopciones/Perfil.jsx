import React, { useEffect, useState } from 'react';
import { obtenerUsuarioPorId, actualizarUsuario } from "../../services/userService";

const Perfil = () => {
  const [usuario, setUsuario] = useState({ nombre: '', email: '', telefono: '', direccion: '' });
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      try {
        const data = await obtenerUsuarioPorId(userId);
        setUsuario(data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setCargando(false);
      }
    }
  };

  const handleGuardar = async () => {
    const userId = sessionStorage.getItem("userId");
    try {
      await actualizarUsuario(userId, usuario);
      setEditando(false);
      alert("¡Perfil actualizado con éxito!");
    } catch (error) {
      alert("Error al actualizar. Verifica que el correo no esté duplicado.");
    }
  };

  if (cargando) return <div style={{textAlign: 'center', padding: '50px'}}>Cargando perfil...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatar}>{usuario.nombre?.charAt(0).toUpperCase()}</div>
        <h2>{usuario.nombre}</h2>
        <span style={styles.badge}>Usuario Activo</span>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.field}>
          <label style={styles.label}>Nombre Completo</label>
          <input disabled={!editando} value={usuario.nombre} onChange={e => setUsuario({...usuario, nombre: e.target.value})} style={styles.input(editando)} />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          {/* Ahora el email SÍ es editable */}
          <input disabled={!editando} value={usuario.email} onChange={e => setUsuario({...usuario, email: e.target.value})} style={styles.input(editando)} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Teléfono</label>
          <input disabled={!editando} value={usuario.telefono} onChange={e => setUsuario({...usuario, telefono: e.target.value})} style={styles.input(editando)} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Dirección</label>
          <input disabled={!editando} value={usuario.direccion} onChange={e => setUsuario({...usuario, direccion: e.target.value})} style={styles.input(editando)} />
        </div>
      </div>

      <div style={styles.actions}>
        {!editando ? (
          <button onClick={() => setEditando(true)} style={styles.btnPrimary}>Editar Información</button>
        ) : (
          <>
            <button onClick={handleGuardar} style={styles.btnSuccess}>Guardar Cambios</button>
            <button onClick={() => setEditando(false)} style={styles.btnSecondary}>Cancelar</button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '700px', margin: '40px auto', background: 'white', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' },
  header: { textAlign: 'center', marginBottom: '40px' },
  avatar: { width: '80px', height: '80px', background: '#e0f2fe', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', margin: '0 auto 15px' },
  badge: { background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '0.9rem', color: '#64748b', fontWeight: '500' },
  input: (editable) => ({ padding: '12px', borderRadius: '12px', border: editable ? '2px solid #3b82f6' : '1px solid #e2e8f0', fontSize: '1rem', outline: 'none' }),
  actions: { marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center' },
  btnPrimary: { padding: '12px 30px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' },
  btnSuccess: { padding: '12px 30px', background: '#10b981', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' },
  btnSecondary: { padding: '12px 30px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }
};

export default Perfil;