import React, { useEffect, useState } from "react";
import {
  obtenerUsuarioPorId,
  actualizarUsuario,
} from "../../services/userService";

const Perfil = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });
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

  if (cargando)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Cargando perfil...
      </div>
    );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatarContainer}>
          <div style={styles.avatar}>
            {usuario.nombre?.charAt(0).toUpperCase()}
          </div>

          <h2 style={styles.nombre}>
            {usuario.nombre} {usuario.apellido}
          </h2>

          <div style={styles.badges}>
            <span style={styles.badgeEstado}>
              {usuario.estado ? "🟢 Activo" : "🔴 Inactivo"}
            </span>

            <span style={styles.badgeRol}>{usuario.rol}</span>
          </div>
        </div>
        <h2>{usuario.nombre}</h2>
        <span style={styles.badge}>Usuario Activo</span>
      </div>

      <div style={styles.formGrid}>
        <div style={styles.cardCampo}>
    <label style={styles.label}>
        👤 Nombre
    </label>

    <input
        disabled={!editando}
        value={usuario.nombre}
        onChange={(e)=>
            setUsuario({...usuario,nombre:e.target.value})
        }
        style={styles.input(editando)}
    />
</div>

       <div style={styles.cardCampo}>
    <label style={styles.label}>
        ✉ Correo electrónico
    </label>

    <input
        disabled={!editando}
        value={usuario.correo}
        onChange={(e)=>
            setUsuario({...usuario,correo:e.target.value})
        }
        style={styles.input(editando)}
    />
</div>

        <div style={styles.field}>
          <label>📞 Teléfono</label>
          <input
            disabled={!editando}
            value={usuario.telefono}
            onChange={(e) =>
              setUsuario({ ...usuario, telefono: e.target.value })
            }
            style={styles.input(editando)}
          />
        </div>

        <div style={styles.field}>
         <label>📍 Dirección</label>
          <input
            disabled={!editando}
            value={usuario.direccion}
            onChange={(e) =>
              setUsuario({ ...usuario, direccion: e.target.value })
            }
            style={styles.input(editando)}
          />
        </div>
      </div>



{/* Información adicional */}

<div style={styles.infoExtra}>

  <div style={styles.infoCard}>
    <span>🛡 Rol</span>
    <strong>{usuario.rol}</strong>
  </div>

  <div style={styles.infoCard}>
    <span>📅 Registro</span>
    <strong>
      {usuario.fechaRegistro
        ? usuario.fechaRegistro.substring(0, 10)
        : "No disponible"}
    </strong>
  </div>

  <div style={styles.infoCard}>
    <span>✅ Estado</span>
    <strong>
      {usuario.estado ? "Activo" : "Inactivo"}
    </strong>
  </div>

</div>

      <div style={styles.actions}>
        {!editando ? (
          <button onClick={() => setEditando(true)} style={styles.btnPrimary}>
            Editar Información
          </button>
        ) : (
          <>
            <button onClick={handleGuardar} style={styles.btnSuccess}>
              Guardar Cambios
            </button>
            <button
              onClick={() => setEditando(false)}
              style={styles.btnSecondary}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
 container:{
padding:"0",
maxWidth:"900px",
margin:"40px auto",
background:"#fff",
borderRadius:"25px",
overflow:"hidden",
boxShadow:"0 20px 50px rgba(0,0,0,.08)"
},
header:{
background:
"linear-gradient(135deg,#fb923c,#f97316)",
padding:"50px",
textAlign:"center",
color:"white"
},
  avatarContainer:{
display:"flex",
flexDirection:"column",
alignItems:"center"
},

avatar:{
width:"120px",
height:"120px",
borderRadius:"50%",
background:"white",
color:"#f97316",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"55px",
fontWeight:"700",
marginBottom:"20px",
boxShadow:"0 10px 25px rgba(0,0,0,.15)"
},


nombre:{
fontSize:"30px",
fontWeight:"700",
marginBottom:"15px"
},
  badges:{
display:"flex",
gap:"12px"
},

badgeEstado:{
background:"#dcfce7",
color:"#166534",
padding:"8px 16px",
borderRadius:"30px",
fontWeight:"600"
},

badgeRol:{
background:"rgba(255,255,255,.25)",
padding:"8px 16px",
borderRadius:"30px",
fontWeight:"600"
},
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "0.9rem", color: "#64748b", fontWeight: "500" },
  input:(editable)=>({

padding:"14px",

fontSize:"15px",

borderRadius:"14px",

border:editable
?"2px solid #fb923c"
:"1px solid #e5e7eb",

background:editable
?"white"
:"#f8fafc",

transition:"0.3s"

}),
  actions: {
    marginTop: "40px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
 btnPrimary:{
padding:"14px 35px",
background:"#f97316",
color:"white",
border:"none",
borderRadius:"14px",
fontWeight:"700",
cursor:"pointer",
transition:".3s"
},

 btnSuccess:{
padding:"14px 35px",
background:"#22c55e",
color:"white",
border:"none",
borderRadius:"14px",
fontWeight:"700",
cursor:"pointer"
},
 btnSecondary:{
padding:"14px 35px",
background:"#e5e7eb",
color:"#374151",
border:"none",
borderRadius:"14px",
fontWeight:"700",
cursor:"pointer"
},
};

export default Perfil;
