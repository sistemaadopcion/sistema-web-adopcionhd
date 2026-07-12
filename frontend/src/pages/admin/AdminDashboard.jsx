import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Dog,
  Clock3,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  Bell,
} from "lucide-react";

import { obtenerSolicitudes } from "../../services/adopcionService";
import { obtenerTodasLasMascotas } from "../../services/mascotaService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalSolicitudes: 0,
    pendientes: 0,
    totalMascotas: 0,
    cargando: true,
  });

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const [solicitudes, mascotas] = await Promise.all([
        obtenerSolicitudes(),
        obtenerTodasLasMascotas(),
      ]);

      setStats({
        totalSolicitudes: solicitudes.length,
        pendientes: solicitudes.filter(
          (s) => s.estadoSolicitud === "ENVIADA"
        ).length,
        totalMascotas: mascotas.length,
        cargando: false,
      });
    } catch (error) {
      console.error(error);
      setStats((prev) => ({
        ...prev,
        cargando: false,
      }));
    }
  };

  const navegarA = (estado) => {
    navigate(`/admin/solicitudes?estado=${estado}`);
  };

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

      {/* HEADER */}

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
                    Gestiona mascotas, solicitudes y usuarios desde un solo lugar.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white/10 rounded-3xl backdrop-blur-lg p-6 w-full lg:w-80">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-orange-100 text-sm">
                    Solicitudes pendientes
                  </p>

                  <h2 className="text-5xl font-bold mt-2">
                    {stats.pendientes}
                  </h2>

                </div>

                <Clock3
                  size={46}
                  className="text-white"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* TARJETAS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

          <DashboardCard
            color="orange"
            title="Solicitudes Pendientes"
            value={stats.pendientes}
            subtitle="Revisar ahora"
            icon={<Clock3 size={42} />}
            onClick={() => navegarA("ENVIADA")}
          />

          <DashboardCard
            color="blue"
            title="Total Solicitudes"
            value={stats.totalSolicitudes}
            subtitle="Ver historial"
            icon={<FileText size={42} />}
            onClick={() => navegarA("TODAS")}
          />

          <DashboardCard
            color="green"
            title="Mascotas Registradas"
            value={stats.totalMascotas}
            subtitle="Administrar catálogo"
            icon={<Dog size={42} />}
            onClick={() => navigate("/admin/mascotas")}
          />

        </div>

        {/* ACCIONES RAPIDAS */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-8">

            <div className="flex items-center gap-3 mb-6">

              <Sparkles className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Acciones rápidas
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-5">

              <button
                onClick={() => navigate("/admin/mascotas")}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-6 transition-all hover:scale-105"
              >
                <Dog className="mb-4" size={35} />

                <h3 className="font-bold">
                  Mascotas
                </h3>

                <p className="text-sm opacity-90 mt-2">
                  Registrar o editar mascotas.
                </p>
              </button>

              <button
                onClick={() => navegarA("TODAS")}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-6 transition-all hover:scale-105"
              >
                <FileText className="mb-4" size={35} />

                <h3 className="font-bold">
                  Solicitudes
                </h3>

                <p className="text-sm opacity-90 mt-2">
                  Revisar adopciones.
                </p>
              </button>

              <button
                onClick={() => navigate("/admin/usuarios")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl p-6 transition-all hover:scale-105"
              >
                <Bell className="mb-4" size={35} />

                <h3 className="font-bold">
                  Usuarios
                </h3>

                <p className="text-sm opacity-90 mt-2">
                  Administrar cuentas.
                </p>
              </button>
            </div>
          </div>
                    {/* RESUMEN DEL SISTEMA */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-6">
              Resumen
            </h2>

            <div className="space-y-6">

              <ResumenItem
                titulo="Solicitudes pendientes"
                valor={stats.pendientes}
                color="bg-orange-500"
              />

              <ResumenItem
                titulo="Solicitudes registradas"
                valor={stats.totalSolicitudes}
                color="bg-blue-500"
              />

              <ResumenItem
                titulo="Mascotas registradas"
                valor={stats.totalMascotas}
                color="bg-emerald-500"
              />

            </div>

          </div>

        </div>





        {/* ACTIVIDAD */}

        <div className="bg-white rounded-3xl shadow-sm p-8 mt-10">

          <div className="flex items-center gap-3 mb-8">

            <Clock3
              className="text-orange-500"
            />

            <h2 className="text-2xl font-bold">
              Actividad reciente
            </h2>

          </div>

          <div className="space-y-5">

            <Actividad
              color="bg-orange-500"
              titulo={`${stats.pendientes} solicitudes esperando revisión`}
            />

            <Actividad
              color="bg-blue-500"
              titulo={`${stats.totalSolicitudes} solicitudes registradas`}
            />

            <Actividad
              color="bg-green-500"
              titulo={`${stats.totalMascotas} mascotas disponibles en el sistema`}
            />

          </div>

        </div>





        {/* RECOMENDACIÓN */}

        <div className="mt-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h2 className="text-3xl font-bold mb-3">
                Recomendación
              </h2>

              <p className="text-orange-100">

                Actualmente existen

                <span className="font-bold text-white">

                  {" "} {stats.pendientes} {" "}

                </span>

                solicitudes pendientes.

                Procura revisarlas para agilizar los procesos de adopción.

              </p>

            </div>

            <button

              onClick={() => navegarA("ENVIADA")}

              className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center gap-2"

            >

              Revisar ahora

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}









function DashboardCard({

  title,
  value,
  subtitle,
  icon,
  color,
  onClick

}) {

  const colors = {

    orange: "from-orange-400 to-orange-600",

    blue: "from-sky-400 to-blue-600",

    green: "from-emerald-400 to-emerald-600",

  };

  return (

    <div

      onClick={onClick}

      className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"

    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 font-medium">

            {title}

          </p>

          <h2 className="text-5xl font-extrabold mt-3 text-slate-800">

            {value}

          </h2>

          <div className="mt-6 flex items-center gap-2 text-orange-600 font-semibold">

            {subtitle}

            <ArrowRight size={16} />

          </div>

        </div>

        <div

          className={`

            w-20

            h-20

            rounded-3xl

            flex

            items-center

            justify-center

            bg-gradient-to-br

            ${colors[color]}

            text-white

            shadow-lg

          `}

        >

          {icon}

        </div>

      </div>

    </div>

  );

}










function ResumenItem({

  titulo,

  valor,

  color

}) {

  return (

    <div className="flex items-center gap-4">

      <div

        className={`

          w-4

          h-4

          rounded-full

          ${color}

        `}

      />

      <div className="flex-1">

        <p className="text-slate-600">

          {titulo}

        </p>

      </div>

      <span className="font-bold text-xl">

        {valor}

      </span>

    </div>

  );

}









function Actividad({

  titulo,

  color

}) {

  return (

    <div className="flex items-center gap-5">

      <div

        className={`

          w-4

          h-4

          rounded-full

          ${color}

        `}

      />

      <div className="flex-1">

        <p className="font-medium text-slate-700">

          {titulo}

        </p>

      </div>

    </div>

  );

}

export default AdminDashboard;