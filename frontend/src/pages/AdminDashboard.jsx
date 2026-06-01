export default function AdminDashboard() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-emerald-950 mb-2">
          Bienvenido de nuevo, Administrador
        </h2>

        <p className="text-slate-600">
          Gestionando Can Martin con amor y eficiencia hoy.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3>Total Mascotas</h3>
          <p className="text-5xl font-bold">124</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3>Solicitudes</h3>
          <p className="text-5xl font-bold">18</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3>Adopciones</h3>
          <p className="text-5xl font-bold">56</p>
        </div>
      </div>
    </section>
  );
}