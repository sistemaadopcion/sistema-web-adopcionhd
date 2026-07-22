import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || "https://backend-sistema-production-b4b3.up.railway.app";

export default function DonacionesAdmin() {
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para el formulario de nueva donación
  const [donante, setDonante] = useState('');
  const [monto, setMonto] = useState('');
  const [metodoPago, setMetodoPago] = useState('TARJETA');

  // Cargar donaciones de la API
  const cargarDonaciones = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/donaciones`);
      if (!res.ok) throw new Error('Error al cargar donaciones');
      const data = await res.json();
      setDonaciones(data);
    } catch (err) {
      console.error("Error al obtener donaciones:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDonaciones();
  }, []);

  // Registrar nueva donación
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donante || !monto) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/donaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donante,
          monto: parseFloat(monto),
          metodoPago
        }),
      });

      if (!res.ok) throw new Error('Error al registrar la donación');

      // Limpiar formulario y recargar lista de la base de datos
      setDonante('');
      setMonto('');
      cargarDonaciones();
      alert("¡Donación registrada con éxito!");
    } catch (err) {
      console.error("Error al registrar:", err);
      alert("Hubo un error al registrar la donación");
    }
  };

  // Calcular total recaudado dinámicamente
  const totalRecaudado = donaciones.reduce((acc, curr) => acc + (curr.monto || 0), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Donaciones</h1>

      {/* Tarjetas de Resumen Dinámicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-pink-500">
          <p className="text-gray-500 text-sm">Total Recaudado</p>
          <p className="text-2xl font-bold text-gray-800">S/. {totalRecaudado.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm">Donaciones Registradas</p>
          <p className="text-2xl font-bold text-gray-800">{donaciones.length}</p>
        </div>
      </div>

      {/* Formulario para Registrar Nueva Donación */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Registrar Nueva Donación</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Nombre del Donante"
            value={donante}
            onChange={(e) => setDonante(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="number"
            placeholder="Monto (Ej. 150)"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="TARJETA">TARJETA</option>
            <option value="TRANSFERENCIA">TRANSFERENCIA</option>
            <option value="YAPE / PLIN">YAPE / PLIN</option>
          </select>
          <button
            type="submit"
            className="bg-pink-600 text-white font-semibold p-2 rounded hover:bg-pink-700 transition"
          >
            Guardar Donación
          </button>
        </form>
      </div>

      {/* Tabla de Donaciones */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b font-semibold text-gray-700">Lista de Donaciones</div>
        {loading ? (
          <p className="p-4 text-gray-500">Cargando donaciones...</p>
        ) : donaciones.length === 0 ? (
          <p className="p-4 text-gray-500">No hay donaciones registradas.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b text-gray-600 text-sm">
                <th className="p-3">Donante</th>
                <th className="p-3">Monto</th>
                <th className="p-3">Método</th>
                <th className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {donaciones.map((d, index) => (
                <tr key={d.id || index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800">{d.donante}</td>
                  <td className="p-3 text-gray-600">S/. {d.monto}</td>
                  <td className="p-3 text-gray-600">{d.metodoPago || d.metodo_pago}</td>
                  <td className="p-3 text-gray-500 text-sm">
                    {d.fechaDonacion ? new Date(d.fechaDonacion).toLocaleString() : 'Reciente'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}