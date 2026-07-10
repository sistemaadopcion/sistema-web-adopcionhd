import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importante para la navegación
import { obtenerSolicitudes } from "../../services/adopcionService";
import { obtenerTodasLasMascotas } from "../../services/mascotaService";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSolicitudes: 0,
    pendientes: 0,
    totalMascotas: 0,
    cargando: true
  });

  useEffect(() => { cargarEstadisticas(); }, []);

  const cargarEstadisticas = async () => {
    try {
      const [solicitudes, mascotas] = await Promise.all([
        obtenerSolicitudes(),
        obtenerTodasLasMascotas()
      ]);

      setStats({
        totalSolicitudes: solicitudes.length,
        // Usamos 'ENVIADA' que es el estado que definimos como pendiente
        pendientes: solicitudes.filter(s => s.estadoSolicitud === "ENVIADA").length,
        totalMascotas: mascotas.length,
        cargando: false
      });
    } catch (error) {
      console.error(error);
      setStats(prev => ({ ...prev, cargando: false }));
    }
  };

  // Función para navegar y filtrar
  const navegarA = (filtro) => {
    navigate(`/admin/solicitudes?estado=${filtro}`);
  };

  if (stats.cargando) return <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>⏳ Cargando panel...</div>;

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1e293b)", borderRadius: 20, color: "white", padding: 40, marginBottom: 35 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>🐶 Panel Administrativo Can Martin</h1>
        <p style={{ marginTop: 10, opacity: 0.8 }}>Gestión centralizada de adopciones y registros.</p>
      </div>

      {/* Cards Interactivas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 25 }}>
        <Card color="#f59e0b" icon="📄" titulo="Solicitudes Pendientes" valor={stats.pendientes} descripcion="Ver por revisar" onClick={() => navegarA('ENVIADA')} />
        <Card color="#3b82f6" icon="📬" titulo="Total Solicitudes" valor={stats.totalSolicitudes} descripcion="Ver historial completo" onClick={() => navegarA('TODAS')} />
        <Card color="#10b981" icon="🐶" titulo="Mascotas" valor={stats.totalMascotas} descripcion="Ver catálogo" onClick={() => navigate('/admin/mascotas')} />
      </div>

      {/* Sección Informativa adicional */}
      <div style={{ marginTop: 35, background: "white", padding: 30, borderRadius: 20, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
        <h2>💡 Recomendación rápida</h2>
        <p style={{ color: "#64748b" }}>Tienes <strong>{stats.pendientes}</strong> solicitudes esperando tu atención. Prioriza las solicitudes de "Casa" para agilizar procesos de adopción.</p>
      </div>
    </div>
  );
}

// Card mejorada con prop onClick
const Card = ({ titulo, valor, color, icon, descripcion, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: "white", borderRadius: 18, padding: 28, boxShadow: "0 10px 15px rgba(0,0,0,.05)",
      cursor: "pointer", borderTop: `6px solid ${color}`, transition: "transform 0.2s"
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ color: "#64748b", fontWeight: 600 }}>{titulo}</div>
        <div style={{ fontSize: 40, fontWeight: "bold", color: "#0f172a" }}>{valor}</div>
        <div style={{ color: "#3b82f6", fontSize: "0.9rem", marginTop: 5, textDecoration: "underline" }}>{descripcion}</div>
      </div>
      <div style={{ fontSize: 50 }}>{icon}</div>
    </div>
  </div>
);

export default AdminDashboard;