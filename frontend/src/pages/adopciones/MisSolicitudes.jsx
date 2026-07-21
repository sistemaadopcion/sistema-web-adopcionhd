import React, { useEffect, useState } from "react";
import { obtenerSolicitudesPorUsuario } from "../../services/adopcionService";
import { Clock3, CheckCircle2, XCircle, PawPrint, Calendar, Home } from "lucide-react";

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

  const getEstadoClasses = (estado) => {
    switch (estado) {
      case "APROBADA":
        return {
          wrapper: "bg-green-100 text-green-700",
          icono: <CheckCircle2 size={18} />,
          texto: "Solicitud Aprobada",
        };
      case "DENEGADA":
        return {
          wrapper: "bg-red-100 text-red-700",
          icono: <XCircle size={18} />,
          texto: "Solicitud Denegada",
        };
      default:
        return {
          wrapper: "bg-amber-100 text-amber-700",
          icono: <Clock3 size={18} />,
          texto: "En revisión",
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-can-secondary mb-3">📋 Mis Solicitudes</h1>
        <p className="text-gray-600 text-lg">Consulta el estado de todas tus solicitudes de adopción.</p>
      </div>

      {solicitudes.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
          <div className="text-7xl mb-6">🐶</div>
          <h2 className="text-2xl font-bold text-can-secondary">Aún no tienes solicitudes</h2>
          <p className="text-gray-500 mt-2">Cuando solicites la adopción de una mascota, aparecerá aquí.</p>
        </div>
      ) : (
        solicitudes.map((s) => {
          const estado = getEstadoClasses(s.estadoSolicitud);
          return (
            <div key={s.id} className="bg-white rounded-3xl mb-8 overflow-hidden shadow-sm border border-gray-100 grid md:grid-cols-[280px,1fr] transition-all hover:shadow-md">
              <img 
                src={s.mascota?.foto || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80"}
                alt={s.mascota?.nombre}
                className="w-full h-64 md:h-full object-cover"
              />

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-can-secondary">{s.mascota?.nombre}</h2>
                    <p className="text-gray-500">{s.mascota?.raza || "Mascota"}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${estado.wrapper}`}>
                    {estado.icono} {estado.texto}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <InfoItem icon={<PawPrint size={16} />} label="Mascota" value={s.mascota?.nombre} />
                  <InfoItem icon={<Calendar size={16} />} label="Fecha" value={s.fechaRegistro} />
                  <InfoItem icon={<Home size={16} />} label="Tipo de vivienda" value={s.tipoVivienda} />
                  <InfoItem icon={<Clock3 size={16} />} label="Estado" value={s.estadoSolicitud} />
                </div>

                <div className="mt-8 bg-can-bg p-5 rounded-2xl border border-orange-100">
                  <strong className="text-can-secondary">Motivo de adopción</strong>
                  <p className="text-gray-700 mt-2 leading-relaxed">{s.motivo}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

const InfoItem = ({ icon, label, value }) => (
  <div>
    <small className="text-gray-400 flex items-center gap-1 mb-1">{icon} {label}</small>
    <p className="font-semibold text-gray-700">{value}</p>
  </div>
);

export default MisSolicitudes;