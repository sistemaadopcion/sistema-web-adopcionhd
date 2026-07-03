import React, { useEffect, useState } from "react";
import {
  obtenerSolicitudes,
} from "../../services/adopcionService";
import {
  obtenerTodasLasMascotas,
} from "../../services/mascotaService";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalSolicitudes: 0,
    pendientes: 0,
    totalMascotas: 0,
    cargando: true
  });

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {

      const [solicitudes, mascotas] = await Promise.all([
        obtenerSolicitudes(),
        obtenerTodasLasMascotas()
      ]);

      setStats({
        totalSolicitudes: solicitudes.length,
        pendientes: solicitudes.filter(
          s => s.estadoSolicitud === "PENDIENTE"
        ).length,
        totalMascotas: mascotas.length,
        cargando: false
      });

    } catch (error) {
      console.error(error);
      setStats(prev => ({
        ...prev,
        cargando: false
      }));
    }
  };

  if (stats.cargando)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 22,
          color: "#2563eb",
          fontWeight: "bold"
        }}
      >
        ⏳ Cargando Dashboard...
      </div>
    );

  const porcentaje =
    stats.totalSolicitudes === 0
      ? 0
      : Math.round(
          (stats.pendientes / stats.totalSolicitudes) * 100
        );

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "40px"
      }}
    >
      {/* Header */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#1d4ed8)",
          borderRadius: 20,
          color: "white",
          padding: 35,
          marginBottom: 35,
          boxShadow:
            "0 15px 35px rgba(37,99,235,.3)"
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 36
          }}
        >
          🐶 Panel Administrativo
        </h1>

        <p
          style={{
            marginTop: 10,
            opacity: .9,
            fontSize: 18
          }}
        >
          Bienvenido nuevamente.
          Aquí puedes monitorear el estado general del sistema
          <b> Can Martin.</b>
        </p>

        <small>
          {new Date().toLocaleDateString("es-PE", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </small>
      </div>

      {/* Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: 25
        }}
      >

        <Card
          color="#f59e0b"
          icon="📄"
          titulo="Solicitudes Pendientes"
          valor={stats.pendientes}
          descripcion="Esperando revisión"
        />

        <Card
          color="#3b82f6"
          icon="📬"
          titulo="Total Solicitudes"
          valor={stats.totalSolicitudes}
          descripcion="Registradas"
        />

        <Card
          color="#10b981"
          icon="🐶"
          titulo="Mascotas"
          valor={stats.totalMascotas}
          descripcion="Disponibles"
        />

      </div>

      {/* Segunda fila */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 25,
          marginTop: 35
        }}
      >

        {/* Estado */}

        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 30,
            boxShadow:
              "0 8px 25px rgba(0,0,0,.06)"
          }}
        >

          <h2>📈 Estado de Solicitudes</h2>

          <p>
            {porcentaje}% de las solicitudes aún están
            pendientes.
          </p>

          <div
            style={{
              width: "100%",
              background: "#e2e8f0",
              borderRadius: 30,
              overflow: "hidden",
              height: 18
            }}
          >

            <div
              style={{
                width: `${porcentaje}%`,
                background:
                  "linear-gradient(90deg,#f59e0b,#f97316)",
                height: "100%"
              }}
            />

          </div>

        </div>

        {/* Actividad */}

        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 30,
            boxShadow:
              "0 8px 25px rgba(0,0,0,.06)"
          }}
        >

          <h2>⚡ Estado</h2>

          <Actividad
            color="#22c55e"
            texto="Servidor funcionando"
          />

          <Actividad
            color="#3b82f6"
            texto="API conectada"
          />

          <Actividad
            color="#f59e0b"
            texto={`${stats.pendientes} solicitudes pendientes`}
          />

          <Actividad
            color="#10b981"
            texto={`${stats.totalMascotas} mascotas registradas`}
          />

        </div>

      </div>
    </div>
  );
}

const Card = ({
  titulo,
  valor,
  color,
  icon,
  descripcion
}) => (

  <div
    style={{
      background: "white",
      borderRadius: 18,
      padding: 28,
      boxShadow:
        "0 10px 25px rgba(0,0,0,.08)",
      transition: ".3s",
      cursor: "pointer",
      borderTop: `6px solid ${color}`
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform =
        "translateY(-8px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform =
        "translateY(0)";
    }}
  >

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <div>

        <div
          style={{
            color: "#64748b",
            fontWeight: 600
          }}
        >
          {titulo}
        </div>

        <div
          style={{
            fontSize: 42,
            fontWeight: "bold",
            marginTop: 10,
            color: "#0f172a"
          }}
        >
          {valor}
        </div>

        <div
          style={{
            color: "#94a3b8",
            marginTop: 10
          }}
        >
          {descripcion}
        </div>

      </div>

      <div
        style={{
          fontSize: 55
        }}
      >
        {icon}
      </div>

    </div>

  </div>
);

const Actividad = ({ color, texto }) => (

  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: 18
    }}
  >

    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: 20,
        background: color,
        marginRight: 12
      }}
    />

    <span>{texto}</span>

  </div>

);

export default AdminDashboard;