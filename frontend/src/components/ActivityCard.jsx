export default function ActivityCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-6">
        Actividad Reciente
      </h3>

      <div className="space-y-6 text-sm">
        <div>
          <p className="font-semibold">
            Solicitud de adopción aprobada
          </p>

          <p className="text-slate-500">
            Luna tiene un nuevo hogar con la familia García.
          </p>

          <p className="text-emerald-600 text-xs mt-1">
            Hace 2 horas
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Cita médica programada
          </p>

          <p className="text-slate-500">
            Chequeo anual para Oliver con el Dr. Ruiz.
          </p>

          <p className="text-emerald-600 text-xs mt-1">
            Hace 5 horas
          </p>
        </div>
      </div>

      <button className="mt-10 text-emerald-700 text-sm">
        Ver reporte de actividad
      </button>
    </div>
  );
}