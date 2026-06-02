import React, { useEffect, useState } from "react";
import {
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
} from "../../services/userService";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => { cargarUsuarios(); }, []);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuarios();
    setUsuarios(data);
  };

  const handleSave = async (id) => {
    // Si el campo de contraseña está vacío, no lo enviamos para no sobrescribir
    const payload = { 
      ...editForm, 
      estado: editForm.estado === "ACTIVO" 
    };
    if (!payload.contrasena) delete payload.contrasena;
    
    await actualizarUsuario(id, payload);
    setEditingId(null);
    cargarUsuarios();
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ color: "#1e293b", marginBottom: "20px" }}>👥 Gestión de Usuarios</h1>
      
      <input
        type="text"
        placeholder="🔍 Buscar por nombre o correo..."
        style={{ padding: "12px", width: "100%", maxWidth: "400px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            {["ID", "Nombre", "Apellido", "Correo", "Teléfono", "Rol", "Contraseña", "Estado", "Acciones"].map(h => (
              <th key={h} style={{ padding: "16px", textAlign: "left", color: "#475569" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((u) => (
            <tr key={u.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
              {editingId === u.id ? (
                <>
                  <td>{u.id}</td>
                  <td><input value={editForm.nombre || ''} onChange={e => setEditForm({...editForm, nombre: e.target.value})} style={{width: '70px'}} /></td>
                  <td><input value={editForm.apellido || ''} onChange={e => setEditForm({...editForm, apellido: e.target.value})} style={{width: '70px'}} /></td>
                  <td><input value={editForm.correo || ''} onChange={e => setEditForm({...editForm, correo: e.target.value})} style={{width: '100px'}} /></td>
                  <td><input value={editForm.telefono || ''} onChange={e => setEditForm({...editForm, telefono: e.target.value})} style={{width: '80px'}} /></td>
                  <td>
                    <select value={editForm.rol} onChange={e => setEditForm({...editForm, rol: e.target.value})}>
                      <option value="ADMIN">ADMIN</option>
                      <option value="ADOPTANTE">ADOPTANTE</option>
                    </select>
                  </td>
                  <td>
                    <input type="password" placeholder="Nueva clave" onChange={e => setEditForm({...editForm, contrasena: e.target.value})} style={{width: '90px'}} />
                  </td>
                  <td>
                    <select value={editForm.estado === true ? "ACTIVO" : "INACTIVO"} onChange={e => setEditForm({...editForm, estado: e.target.value})}>
                      <option value="ACTIVO">ACTIVO</option>
                      <option value="INACTIVO">INACTIVO</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSave(u.id)} style={{background: '#22c55e', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>💾</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{padding: '16px'}}>{u.id}</td>
                  <td style={{padding: '16px'}}>{u.nombre}</td>
                  <td style={{padding: '16px'}}>{u.apellido}</td>
                  <td style={{padding: '16px'}}>{u.correo}</td>
                  <td style={{padding: '16px'}}>{u.telefono}</td>
                  <td style={{padding: '16px'}}>{u.rol}</td>
                  <td style={{padding: '16px'}}>********</td>
                  <td style={{padding: '16px'}}>
                    <span style={{ padding: "4px 8px", borderRadius: "12px", background: u.estado ? "#dcfce7" : "#fee2e2", color: u.estado ? "#166534" : "#991b1b" }}>
                      {u.estado ? "ACTIVO" : "INACTIVO"}
                    </span>
                  </td>
                  <td style={{padding: '16px'}}>
                    <button onClick={() => {setEditingId(u.id); setEditForm(u);}} style={{background: 'none', border: 'none', cursor: 'pointer'}}>✏️</button>
                    <button onClick={() => eliminarUsuario(u.id).then(cargarUsuarios)} style={{background: 'none', border: 'none', cursor: 'pointer'}}>🗑️</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;