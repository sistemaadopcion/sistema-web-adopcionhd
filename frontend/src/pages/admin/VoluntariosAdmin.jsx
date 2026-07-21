import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  Search,
  Loader2,
  Phone,
  Pencil,
  Trash2,
  RefreshCw,
  UserCheck,
} from "lucide-react";

export default function VoluntariosAdmin() {

  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080";

  const [voluntarios, setVoluntarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarVoluntarios();
  }, []);

  const cargarVoluntarios = async () => {

    try {

      setLoading(true);

      const { data } = await axios.get(
        `${API_BASE}/api/voluntarios`
      );

      setVoluntarios(data);

    } catch (error) {

      console.error(error);

      alert("No se pudieron cargar los voluntarios.");

    } finally {

      setLoading(false);

    }

  };

  const eliminarVoluntario = async (id) => {

    if (!window.confirm("¿Eliminar este voluntario?")) return;

    try {

      await axios.delete(
        `${API_BASE}/api/voluntarios/${id}`
      );

      cargarVoluntarios();

    } catch (error) {

      console.error(error);

      alert("No se pudo eliminar.");

    }

  };

  const voluntariosFiltrados = voluntarios.filter((v) =>

    v.nombre
      ?.toLowerCase()
      .includes(busqueda.toLowerCase()) ||

    v.telefono
      ?.toLowerCase()
      .includes(busqueda.toLowerCase())

  );

  return (

    <div className="p-8">
              <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">

            <Users className="text-purple-600" />

            Gestión de Voluntarios

          </h1>

          <p className="text-gray-500 mt-2">

            Administra los voluntarios que fueron aceptados.

          </p>

        </div>

        <button
          onClick={cargarVoluntarios}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl transition"
        >

          <RefreshCw size={18} />

          Actualizar

        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <p className="text-gray-500">

            Total de voluntarios

          </p>

          <h2 className="text-5xl font-bold text-purple-600 mt-3">

            {voluntarios.length}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Buscar por nombre o teléfono..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-purple-500 outline-none"
            />

          </div>

        </div>

      </div>

      {loading ? (

        <div className="flex justify-center py-20">

          <Loader2
            className="animate-spin text-purple-600"
            size={45}
          />

        </div>

      ) : voluntariosFiltrados.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

          <UserCheck
            size={60}
            className="mx-auto text-gray-400 mb-5"
          />

          <h2 className="text-2xl font-bold text-gray-700">

            No existen voluntarios

          </h2>

          <p className="text-gray-500 mt-2">

            Todavía no hay voluntarios aprobados.

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {voluntariosFiltrados.map((v) => (

                        <div
              key={v.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">

                    {v.nombre}

                  </h2>

                  <div className="flex items-center gap-2 mt-4 text-gray-600">

                    <Phone size={16} />

                    {v.telefono}

                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    v.estado === "ACTIVO"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {v.estado}
                </span>

              </div>

              <div className="mt-6">

                <h3 className="font-semibold text-gray-700 mb-2">

                  Experiencia

                </h3>

                <p className="text-gray-600">

                  {v.experiencia || "Sin experiencia registrada"}

                </p>

              </div>

              <div className="mt-6 border-t pt-4">

                <p className="text-sm text-gray-500">

                  ID del voluntario

                </p>

                <p className="font-medium">

                  #{v.id}

                </p>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <Pencil size={18} />
                  Editar
                </button>

                <button
                  onClick={() => eliminarVoluntario(v.id)}
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