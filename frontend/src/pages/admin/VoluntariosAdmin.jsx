import { useState, useEffect } from "react";
import axios from "axios";
import {
  Trash2,
  Loader2,
  UserCheck,
  Mail,
  Phone,
  RefreshCw,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

export default function GestionVoluntariado() {
  const API_BASE =
    import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API_BASE}/api/voluntarios/solicitudes`
      );

      setSolicitudes(data);
    } catch (error) {
      console.error(error);
      alert("No se pudieron cargar las solicitudes.");
    } finally {
      setLoading(false);
    }
  };

  const aprobarSolicitud = async (id) => {
    if (!window.confirm("¿Deseas aprobar esta solicitud?")) return;

    try {
      await axios.put(
        `${API_BASE}/api/voluntarios/solicitudes/${id}/aprobar`
      );

      fetchSolicitudes();
    } catch (error) {
      console.error(error);
      alert("No se pudo aprobar la solicitud.");
    }
  };

  const rechazarSolicitud = async (id) => {
    if (!window.confirm("¿Deseas rechazar esta solicitud?")) return;

    try {
      await axios.put(
        `${API_BASE}/api/voluntarios/solicitudes/${id}/rechazar`
      );

      fetchSolicitudes();
    } catch (error) {
      console.error(error);
      alert("No se pudo rechazar la solicitud.");
    }
  };

  const eliminarSolicitud = async (id) => {
    if (!window.confirm("¿Eliminar esta solicitud?")) return;

    try {
      await axios.delete(
        `${API_BASE}/api/voluntarios/solicitudes/${id}`
      );

      fetchSolicitudes();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la solicitud.");
    }
  };

  const solicitudesFiltradas = solicitudes.filter((s) => {
    return (
      s.nombreCompleto
        ?.toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      s.email
        ?.toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      s.telefono
        ?.toLowerCase()
        .includes(busqueda.toLowerCase())
    );
  });

  return (
    <div className="p-8">


      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Solicitudes de Voluntariado
          </h1>

          <p className="text-gray-500 mt-2">
            Administra las solicitudes recibidas desde el formulario web.
          </p>
        </div>

        <button
          onClick={fetchSolicitudes}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
        >
          <RefreshCw size={18} />
          Actualizar
        </button>

      </div>

      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-3.5 text-gray-400"
        />

        <input
          type="text"
          placeholder="Buscar por nombre, correo o teléfono..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full border rounded-xl py-3 pl-11 pr-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {loading ? (

        <div className="flex justify-center py-20">

          <Loader2
            className="animate-spin text-blue-600"
            size={45}
          />

        </div>

      ) : solicitudesFiltradas.length === 0 ? (

        <div className="bg-white rounded-xl shadow-lg p-10 text-center">

          <UserCheck
            size={60}
            className="mx-auto text-gray-400 mb-5"
          />

          <h2 className="text-2xl font-bold text-gray-700">
            No hay solicitudes
          </h2>

          <p className="text-gray-500 mt-2">
            Actualmente no existen solicitudes registradas.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {solicitudesFiltradas.map((s) => (

            <div
              key={s.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {s.nombreCompleto}
                  </h2>

                  <div className="flex items-center gap-2 mt-4 text-gray-600">
                    <Mail size={16} />
                    {s.email}
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <Phone size={16} />
                    {s.telefono}
                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    s.estado === "APROBADA"
                      ? "bg-green-100 text-green-700"
                      : s.estado === "RECHAZADA"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {s.estado}
                </span>

              </div>

              <div className="mt-6">

                <h3 className="font-semibold text-gray-700 mb-2">
                  Motivación
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {s.motivacion}
                </p>

              </div>

              <div className="mt-6 border-t pt-4">

                <h3 className="text-sm text-gray-500">
                  Fecha de solicitud
                </h3>

                <p className="font-medium mt-1">
                  {new Date(s.fechaSolicitud).toLocaleString()}
                </p>

              </div>
                            <div className="mt-6 flex flex-wrap gap-3">

                {s.estado === "PENDIENTE" && (
                  <>
                    <button
                      onClick={() => aprobarSolicitud(s.id)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <CheckCircle size={18} />
                      Aprobar
                    </button>

                    <button
                      onClick={() => rechazarSolicitud(s.id)}
                      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      <XCircle size={18} />
                      Rechazar
                    </button>
                  </>
                )}

                <button
                  onClick={() => eliminarSolicitud(s.id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <Trash2 size={18} />
                  Eliminar
                </button>

              </div>

            </div>

          ))}

                </div>

      )}

    </div>

  );

}

    