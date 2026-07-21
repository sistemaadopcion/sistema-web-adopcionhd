import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FileText,
  Dog,
  Clock3,
  Sparkles,
  LayoutDashboard,
  Heart,
  Users,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    // Mascotas
    totalMascotas: 0,
    mascotasDisponibles: 0,
    mascotasEnProceso: 0,
    mascotasAdoptadas: 0,
    mascotasSuspendidas: 0,

    // Solicitudes
    totalSolicitudes: 0,
    solicitudesEnviadas: 0,
    solicitudesRevision: 0,
    solicitudesAprobadas: 0,
    solicitudesDenegadas: 0,

    // Usuarios
    totalUsuarios: 0,

    // Voluntarios
    totalVoluntarios: 0,

    // Donaciones
    totalDonaciones: 0,
    montoTotalDonaciones: 0,

    cargando: true,
  });

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

      const { data } = await axios.get(`${API_BASE}/api/dashboard`);

      setStats({
        ...data,
        cargando: false,
      });
    } catch (error) {
      console.error("Error Dashboard:", error);

      setStats((prev) => ({
        ...prev,
        cargando: false,
      }));
    }
  };

  const navegarA = (estado) => navigate(`/admin/solicitudes?estado=${estado}`);

  if (stats.cargando) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 text-lg">
            Cargando panel administrativo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur">
                  <LayoutDashboard size={30} />
                </div>
                <div>
                  <h1 className="text-4xl font-extrabold">
                    Panel Administrativo
                  </h1>
                  <p className="text-orange-100 mt-1">
                    Gestiona adopciones, donaciones y voluntarios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* TARJETAS PRINCIPALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
          <DashboardCard
            color="orange"
            title="Solicitudes"
            value={stats.totalSolicitudes}
            subtitle={`${stats.solicitudesEnviadas} por revisar`}
            icon={<Clock3 size={42} />}
            onClick={() => navegarA("ENVIADA")}
          />

          <DashboardCard
            color="blue"
            title="Mascotas"
            value={stats.totalMascotas}
            subtitle={`${stats.mascotasDisponibles} disponibles`}
            icon={<Dog size={42} />}
            onClick={() => navigate("/admin/mascotas")}
          />

          <DashboardCard
            color="green"
            title="Donaciones"
            value={`S/. ${stats.montoTotalDonaciones.toFixed(2)}`}
            subtitle={`${stats.totalDonaciones} registradas`}
            icon={<Heart size={42} />}
            onClick={() => navigate("/admin/donaciones")}
          />

          <DashboardCard
            color="purple"
            title="Voluntarios"
            value={stats.totalVoluntarios}
            subtitle="Registrados"
            icon={<Users size={42} />}
            onClick={() => navigate("/admin/voluntarios")}
          />
        </div>

        {/* ACCIONES RÁPIDAS */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mt-10">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-orange-500" />
            <h2 className="text-2xl font-bold">Acciones rápidas</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            <button
              onClick={() => navigate("/admin/mascotas")}
              className="bg-orange-500 text-white rounded-2xl p-6 transition hover:scale-105"
            >
              <Dog className="mb-4" size={35} />
              <h3>Mascotas</h3>
            </button>
            <button
              onClick={() => navegarA("TODAS")}
              className="bg-blue-500 text-white rounded-2xl p-6 transition hover:scale-105"
            >
              <FileText className="mb-4" size={35} />
              <h3>Solicitudes</h3>
            </button>
            <button
              onClick={() => navigate("/admin/donaciones")}
              className="bg-pink-500 text-white rounded-2xl p-6 transition hover:scale-105"
            >
              <Heart className="mb-4" size={35} />
              <h3>Donaciones</h3>
            </button>
            <button
              onClick={() => navigate("/admin/voluntarios")}
              className="bg-purple-500 text-white rounded-2xl p-6 transition hover:scale-105"
            >
              <Users className="mb-4" size={35} />
              <h3>Voluntarios</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, subtitle, icon, color, onClick }) {
  const colors = {
    orange: "from-orange-400 to-orange-600",
    blue: "from-sky-400 to-blue-600",
    green: "from-emerald-400 to-emerald-600",
    purple: "from-purple-400 to-purple-600",
    pink: "from-pink-400 to-pink-600",
  };
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 font-medium">{title}</p>
          <h2 className="text-5xl font-extrabold mt-3 text-slate-800">
            {value}
          </h2>
          <div className="mt-6 font-semibold text-orange-600">{subtitle}</div>
        </div>
        <div
          className={`w-20 h-20 rounded-3xl flex items-center justify-center bg-gradient-to-br ${colors[color]} text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
