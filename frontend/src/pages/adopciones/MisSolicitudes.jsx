import React, { useEffect, useState } from "react";
import {
  obtenerSolicitudesPorUsuario,
} from "../../services/adopcionService";

import {
  Clock3,
  CheckCircle2,
  XCircle,
  PawPrint,
  Calendar,
  Home,
} from "lucide-react";

function MisSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (userId) {
      obtenerSolicitudesPorUsuario(userId)
        .then(setSolicitudes)
        .catch(console.error);
    }
  }, []);

  const estadoInfo = (estado) => {
    switch (estado) {
      case "APROBADA":
        return {
          color: "#16a34a",
          fondo: "#dcfce7",
          icono: <CheckCircle2 size={18} />,
          texto: "Solicitud Aprobada",
        };

      case "DENEGADA":
        return {
          color: "#dc2626",
          fondo: "#fee2e2",
          icono: <XCircle size={18} />,
          texto: "Solicitud Denegada",
        };

      default:
        return {
          color: "#d97706",
          fondo: "#fef3c7",
          icono: <Clock3 size={18} />,
          texto: "En revisión",
        };
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "40px",
      }}
    >
      {/* Header */}

      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <h1
          style={{
            fontSize: "2.3rem",
            color: "#0f172a",
            marginBottom: "10px",
          }}
        >
          📋 Mis Solicitudes
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "17px",
          }}
        >
          Consulta el estado de todas tus solicitudes de adopción.
        </p>
      </div>

      {solicitudes.length === 0 ? (
        <div
          style={{
            background: "white",
            borderRadius: "25px",
            padding: "70px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              fontSize: "80px",
            }}
          >
            🐶
          </div>

          <h2
            style={{
              marginTop: "20px",
              color: "#0f172a",
            }}
          >
            Aún no tienes solicitudes
          </h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px",
            }}
          >
            Cuando solicites la adopción de una mascota aparecerá aquí.
          </p>
        </div>
      ) : (
        solicitudes.map((s) => {
          const estado = estadoInfo(s.estadoSolicitud);

          return (
            <div
              key={s.id}
              style={{
                background: "white",
                borderRadius: "24px",
                marginBottom: "25px",
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(15,23,42,.08)",
                display: "grid",
                gridTemplateColumns: "240px 1fr",
              }}
            >
              {/* FOTO */}

              <img
                src={
                  s.mascota?.foto ||
                  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80"
                }
                alt={s.mascota?.nombre}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* INFO */}

              <div
                style={{
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        color: "#0f172a",
                      }}
                    >
                      {s.mascota?.nombre}
                    </h2>

                    <p
                      style={{
                        color: "#64748b",
                        marginTop: "8px",
                      }}
                    >
                      {s.mascota?.raza}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: estado.fondo,
                      color: estado.color,
                      padding: "8px 15px",
                      borderRadius: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    {estado.icono}

                    {estado.texto}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "15px",
                    marginTop: "28px",
                  }}
                >
                  <div>
                    <small
                      style={{
                        color: "#94a3b8",
                      }}
                    >
                      <PawPrint size={14} /> Mascota
                    </small>

                    <p>{s.mascota?.nombre}</p>
                  </div>

                  <div>
                    <small
                      style={{
                        color: "#94a3b8",
                      }}
                    >
                      <Calendar size={14} /> Fecha
                    </small>

                    <p>{s.fechaRegistro}</p>
                  </div>

                  <div>
                    <small
                      style={{
                        color: "#94a3b8",
                      }}
                    >
                      <Home size={14} /> Tipo de vivienda
                    </small>

                    <p>{s.tipoVivienda}</p>
                  </div>

                  <div>
                    <small
                      style={{
                        color: "#94a3b8",
                      }}
                    >
                      Estado
                    </small>

                    <p>{s.estadoSolicitud}</p>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "25px",
                    background: "#f8fafc",
                    borderRadius: "15px",
                    padding: "18px",
                  }}
                >
                  <strong>Motivo de adopción</strong>

                  <p
                    style={{
                      color: "#475569",
                      marginTop: "10px",
                      lineHeight: "1.7",
                    }}
                  >
                    {s.motivo}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MisSolicitudes;