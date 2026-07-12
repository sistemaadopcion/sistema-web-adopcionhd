import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Importa la función autoTable explícitamente
import {
  obtenerSolicitudes,
  actualizarEstadoSolicitud,
} from "../../services/adopcionService";

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filtro, setFiltro] = useState("ENVIADA");
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      const data = await obtenerSolicitudes();
      console.log(data);
      setSolicitudes(data);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

const generarReportePDF = () => {

  if (!solicitudes || solicitudes.length === 0) {
    alert("No existen solicitudes para generar el reporte.");
    return;
  }

  const doc = new jsPDF("p", "mm", "a4");

  //==========================
  // COLORES
  //==========================

  const azul = [15, 23, 42];
  const naranja = [249, 115, 22];
  const gris = [100, 116, 139];

  //==========================
  // ENCABEZADO
  //==========================

  doc.setFillColor(...azul);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255,255,255);
  doc.setFont("helvetica","bold");
  doc.setFontSize(22);

  doc.text("CAN MARTÍN",105,15,{align:"center"});

  doc.setFontSize(12);

  doc.text(
      "Sistema de Gestión de Adopciones",
      105,
      24,
      {align:"center"}
  );

  doc.setDrawColor(...naranja);
  doc.setLineWidth(0.8);
  doc.line(15,40,195,40);

  //==========================
  // TITULO
  //==========================

  doc.setTextColor(0,0,0);
  doc.setFontSize(18);
  doc.setFont("helvetica","bold");

  doc.text(
      "REPORTE GENERAL DE SOLICITUDES",
      105,
      50,
      {align:"center"}
  );

  doc.setFontSize(10);
  doc.setFont("helvetica","normal");

  doc.text(
      `Fecha de generación: ${new Date().toLocaleDateString("es-PE")}`,
      15,
      60
  );

  doc.text(
      `Hora: ${new Date().toLocaleTimeString("es-PE")}`,
      15,
      66
  );

  doc.text(
      `Sistema: Can Martín `,
      15,
      72
  );

  //==========================
  // ESTADÍSTICAS
  //==========================

  const pendientes =
      solicitudes.filter(
          s => s.estadoSolicitud==="ENVIADA"
      ).length;

  const aprobadas =
      solicitudes.filter(
          s => s.estadoSolicitud==="APROBADA"
      ).length;

  const denegadas =
      solicitudes.filter(
          s => s.estadoSolicitud==="DENEGADA"
      ).length;

  const total = solicitudes.length;

//==========================================
// TARJETAS DE RESUMEN
//==========================================

const dibujarCard = (
  x,
  y,
  titulo,
  valor,
  color
) => {

  doc.setFillColor(248,250,252);
  doc.roundedRect(x, y, 40, 22, 3, 3, "F");

  doc.setDrawColor(...color);
  doc.setLineWidth(1.2);
  doc.roundedRect(x, y, 40, 22, 3, 3);

  doc.setTextColor(...gris);
  doc.setFontSize(9);
  doc.setFont("helvetica","normal");

  doc.text(titulo, x + 20, y + 8, {
    align: "center"
  });

  doc.setTextColor(...color);
  doc.setFontSize(16);
  doc.setFont("helvetica","bold");

  doc.text(
    valor.toString(),
    x + 20,
    y + 17,
    {
      align: "center"
    }
  );

};

dibujarCard(
  15,
  82,
  "TOTAL",
  total,
  azul
);

dibujarCard(
  60,
  82,
  "PENDIENTES",
  pendientes,
  [245,158,11]
);

dibujarCard(
  105,
  82,
  "APROBADAS",
  aprobadas,
  [22,163,74]
);

dibujarCard(
  150,
  82,
  "DENEGADAS",
  denegadas,
  [220,38,38]
);

//==========================================
// TÍTULO DE LA TABLA
//==========================================

doc.setFontSize(13);
doc.setFont("helvetica","bold");
doc.setTextColor(...azul);

doc.text(
  "Detalle de Solicitudes",
  15,
  118
);

//==========================================
// TABLA DE SOLICITUDES
//==========================================

autoTable(doc, {
  startY: 123,

  head: [[
    "ID",
    "Adoptante",
    "Mascota",
    "Vivienda",
    "Estado",
    "Fecha"
  ]],

  body: solicitudes.map((s) => [

    s.id,

    s.usuario?.nombre || "N/A",

    s.mascota?.nombre || "N/A",

    s.tipoVivienda || "-",

    s.estadoSolicitud,

    s.fechaSolicitud
      ? new Date(s.fechaSolicitud).toLocaleDateString("es-PE")
      : "-"

  ]),

  theme: "grid",

  styles: {
    fontSize: 9,
    cellPadding: 4,
    valign: "middle",
    halign: "center",
    lineColor: [220,220,220],
    lineWidth: 0.2
  },

  headStyles: {
    fillColor: azul,
    textColor: [255,255,255],
    fontStyle: "bold",
    halign: "center"
  },

  alternateRowStyles: {
    fillColor: [248,250,252]
  },

  bodyStyles: {
    textColor: [60,60,60]
  },

  margin: {
    left: 15,
    right: 15
  }
});

//==========================================
// PIE DE PÁGINA
//==========================================

const paginas = doc.getNumberOfPages();

for (let i = 1; i <= paginas; i++) {

  doc.setPage(i);

  doc.setDrawColor(...naranja);

  doc.line(
    15,
    285,
    195,
    285
  );

  doc.setFontSize(9);

  doc.setTextColor(...gris);

  doc.text(
    "Reporte generado automáticamente por Huellitas Home",
    15,
    291
  );

  doc.text(
    `Página ${i} de ${paginas}`,
    195,
    291,
    {
      align: "right"
    }
  );

}

//==========================================
// GUARDAR PDF
//==========================================

const fecha = new Date();

const nombreArchivo =
  `Reporte_Solicitudes_${
    fecha.getFullYear()
  }-${
    String(fecha.getMonth()+1).padStart(2,"0")
  }-${
    String(fecha.getDate()).padStart(2,"0")
  }.pdf`;

doc.save(nombreArchivo);

};










  const manejarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarEstadoSolicitud(id, nuevoEstado);
      await cargarSolicitudes();
      setSolicitudSeleccionada(null);
    } catch (error) {
      alert("Error al procesar: " + error.message);
    }
  };

  const getBadgeStyle = (estado) => {
    const base = {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: "bold",
      textTransform: "uppercase",
    };
    if (estado === "ENVIADA")
      return { ...base, background: "#fef3c7", color: "#92400e" };
    if (estado === "APROBADA")
      return { ...base, background: "#dcfce7", color: "#166534" };
    return { ...base, background: "#fee2e2", color: "#991b1b" };
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1100px",
        margin: "auto",
        fontFamily: "sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
          padding: "30px",
          background: "linear-gradient(135deg,#0f172a,#1e3a8a)",
          borderRadius: "24px",
          color: "#fff",
          boxShadow: "0 15px 40px rgba(0,0,0,.15)",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: "700",
            }}
          >
            📋 Gestión de Solicitudes
          </h1>

          <p
            style={{
              marginTop: "10px",
              opacity: 0.8,
            }}
          >
            Revisa, aprueba o rechaza las solicitudes de adopción.
          </p>
        </div>

        <button
          onClick={generarReportePDF}
          style={{
            padding: "14px 24px",
            background: "#fff",
            color: "#0f172a",
            border: "none",
            borderRadius: "14px",
            fontWeight: "700",
            cursor: "pointer",
            transition: ".3s",
          }}
        >
          📥 Descargar PDF
        </button>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          }}
        >
          <h2 style={{ margin: 0, color: "#f59e0b" }}>
            {solicitudes.filter((s) => s.estadoSolicitud === "ENVIADA").length}
          </h2>

          <p style={{ color: "#64748b" }}>Pendientes</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          }}
        >
          <h2 style={{ margin: 0, color: "#16a34a" }}>
            {solicitudes.filter((s) => s.estadoSolicitud === "APROBADA").length}
          </h2>

          <p style={{ color: "#64748b" }}>Aprobadas</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          }}
        >
          <h2 style={{ margin: 0, color: "#dc2626" }}>
            {solicitudes.filter((s) => s.estadoSolicitud === "DENEGADA").length}
          </h2>

          <p style={{ color: "#64748b" }}>Denegadas</p>
        </div>
      </div>

      {/* Botones de filtro */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "25px" }}>
        {["ENVIADA", "APROBADA", "DENEGADA"].map((estado) => (
          <button
            key={estado}
            onClick={() => setFiltro(estado)}
            style={{
              padding: "10px 24px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: filtro === estado ? "#0f172a" : "#f1f5f9",
              color: filtro === estado ? "white" : "#475569",
              fontWeight: "600",
            }}
          >
            {estado === "ENVIADA" ? "Pendientes" : estado}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div
        style={{
          background: "#fff",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#0f172a",
                color: "#fff",
              }}
            >
              <th
                style={{
                  padding: "22px",
                  fontWeight: "600",
                  letterSpacing: ".5px",
                }}
              >
                Adoptante
              </th>
              <th
                style={{
                  padding: "22px",
                  fontWeight: "600",
                  letterSpacing: ".5px",
                }}
              >
                Mascota
              </th>
              <th
                style={{
                  padding: "22px",
                  fontWeight: "600",
                  letterSpacing: ".5px",
                }}
              >
                Estado
              </th>
              <th
                style={{
                  padding: "22px",
                  fontWeight: "600",
                  letterSpacing: ".5px",
                }}
              >
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {solicitudes
              .filter((s) => s.estadoSolicitud === filtro)
              .map((s) => (
                <tr
                  key={s.id}
                  style={{
                    transition: ".3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                  }}
                >
                  <td style={{ padding: "20px" }}>{s.usuario?.nombre}</td>
                  <td style={{ padding: "20px" }}>{s.mascota?.nombre}</td>
                  <td style={{ padding: "20px", textAlign: "center" }}>
                    <span style={getBadgeStyle(s.estadoSolicitud)}>
                      {s.estadoSolicitud}
                    </span>
                  </td>
                  <td style={{ padding: "20px", textAlign: "right" }}>
                    <button
                      onClick={() => setSolicitudSeleccionada(s)}
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: ".3s",
                      }}
                    >
                      👁 Ver
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal de detalles */}
      {solicitudSeleccionada && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "520px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,.25)",
            }}
          >
            <div
              style={{
                padding: "25px",
                background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
                color: "#fff",
              }}
            >
              <h2 style={{ margin: 0 }}>Solicitud de adopción</h2>

              <p style={{ opacity: 0.8 }}>
                {solicitudSeleccionada.usuario?.nombre}
              </p>
            </div>

            <div
              style={{
                padding: "30px",
              }}
            >
              <p>
                <strong>Mascota:</strong>{" "}
                {solicitudSeleccionada.mascota?.nombre}
              </p>

              <p>
                <strong>Tipo de vivienda:</strong>{" "}
                {solicitudSeleccionada.tipoVivienda}
              </p>

              <p>
                <strong>Motivo:</strong>
              </p>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "18px",
                  borderRadius: "14px",
                  lineHeight: "1.7",
                }}
              >
                {solicitudSeleccionada.motivo}
              </div>
            </div>
            {solicitudSeleccionada.estadoSolicitud === "ENVIADA" && (
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >
                <button
                  style={{
                    flex: 1,
                    padding: "15px",
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  ✅ Aprobar
                </button>

                <button
                  style={{
                    flex: 1,
                    padding: "15px",
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  ❌ Denegar
                </button>
              </div>
            )}
            <button
              onClick={() => setSolicitudSeleccionada(null)}
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "12px",
                background: "transparent",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Solicitudes;
