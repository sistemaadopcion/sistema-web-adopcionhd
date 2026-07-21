import React, { useEffect, useState } from "react";
import { obtenerUsuarioPorId, actualizarUsuario } from "../../services/userService";
import { Calendar, DollarSign } from "lucide-react";

const Perfil = () => {
  const [usuario, setUsuario] = useState({ nombre: "", email: "", telefono: "", direccion: "" });
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Estados para Suscripción e Historial de Donaciones
  const [suscripcion, setSuscripcion] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [ordenMonto, setOrdenMonto] = useState('recientes');

  useEffect(() => {
    const cargarDatos = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const data = await obtenerUsuarioPorId(userId);
          setUsuario(data);
        } catch (error) { 
          console.error("Error al obtener usuario:", error); 
        } finally { 
          setCargando(false); 
        }
      } else {
        setCargando(false);
      }
    };
    cargarDatos();

    // Cargar suscripción e historial simulado o guardado desde localStorage
    const suscripcionGuardada = JSON.parse(localStorage.getItem('suscripcionActiva'));
    const historialGuardado = JSON.parse(localStorage.getItem('historialDonaciones')) || [
      { id: 1, tipo: 'Donación Mensual (Mensual)', monto: 30, fechaHora: '2026-06-15 14:30' },
      { id: 2, tipo: 'Donación Única (Unica)', monto: 100, fechaHora: '2026-05-10 10:15' }
    ];

    setSuscripcion(suscripcionGuardada || { tipo: 'Ninguna suscripción activa', proximoCobro: 'N/A' });
    setHistorial(historialGuardado);
  }, []);

  const handleGuardar = async () => {
    try {
      await actualizarUsuario(sessionStorage.getItem("userId"), usuario);
      setEditando(false);
      alert("¡Perfil actualizado!");
    } catch (error) { 
      alert("Error al actualizar."); 
    }
  };

  // Filtrado y ordenamiento del historial de donaciones
  const historialFiltrado = historial.filter(item => {
    if (filtroTipo === 'mensual') return item.tipo.includes('Mensual');
    if (filtroTipo === 'unica') return item.tipo.includes('Única');
    return true;
  }).sort((a, b) => {
    if (ordenMonto === 'mayor') return b.monto - a.monto;
    if (ordenMonto === 'menor') return a.monto - b.monto;
    return b.id - a.id; // Más recientes por defecto
  });

  if (cargando) return <div className="text-center p-20 text-can-secondary">Cargando perfil...</div>;

  return (
    <div className="max-w-4xl mx-auto my-12 space-y-8 px-4">
      
      {/* Tarjeta Principal de Perfil */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
        {/* Header con gradiente de marca */}
        <div className="bg-gradient-to-br from-can-primary to-orange-500 p-12 text-center text-white relative">
          <div className="w-32 h-32 bg-white text-can-primary rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-6 shadow-lg">
            {usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : "U"}
          </div>
          <h2 className="text-3xl font-bold">{usuario.nombre || "Usuario"}</h2>
          <div className="flex justify-center gap-3 mt-4">
            <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold">
              {usuario.estado ? "🟢 Activo" : "🟢 Activo"}
            </span>
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold">{usuario.rol || "ADOPTANTE"}</span>
          </div>
        </div>

        {/* Formulario */}
        <div className="p-8 md:p-12 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <InputGroup label="👤 Nombre" value={usuario.nombre || ""} onChange={(e) => setUsuario({...usuario, nombre: e.target.value})} editando={editando} />
            <InputGroup label="✉ Correo" value={usuario.correo || usuario.email || ""} onChange={(e) => setUsuario({...usuario, correo: e.target.value})} editando={editando} />
            <InputGroup label="📞 Teléfono" value={usuario.telefono || ""} onChange={(e) => setUsuario({...usuario, telefono: e.target.value})} editando={editando} />
            <InputGroup label="📍 Dirección" value={usuario.direccion || ""} onChange={(e) => setUsuario({...usuario, direccion: e.target.value})} editando={editando} />
          </div>

          {/* Acciones */}
          <div className="flex justify-center gap-4 pt-6">
            {!editando ? (
              <button onClick={() => setEditando(true)} className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-3 rounded-2xl font-bold transition-all">
                Editar Información
              </button>
            ) : (
              <>
                <button onClick={handleGuardar} className="bg-green-500 hover:bg-green-600 text-white px-10 py-3 rounded-2xl font-bold transition-all">
                  Guardar Cambios
                </button>
                <button onClick={() => setEditando(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-10 py-3 rounded-2xl font-bold transition-all">
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* APARTADO: SUSCRIPCIÓN ACTIVA */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="text-orange-500" size={22} /> Suscripción Activa
        </h3>
        <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs text-orange-800 font-semibold uppercase tracking-wider">Plan Seleccionado</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{suscripcion?.tipo}</p>
          </div>
          <div className="bg-white px-5 py-3 rounded-xl border border-orange-200 text-right w-full md:w-auto">
            <p className="text-xs text-slate-500">Próximo Pago / Vencimiento:</p>
            <p className="text-sm font-bold text-orange-600">{suscripcion?.proximoCobro}</p>
          </div>
        </div>
      </div>

      {/* APARTADO: HISTORIAL DE DONACIONES */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="text-orange-500" size={22} /> Historial de Donaciones
          </h3>
          
          {/* Controles de Filtro y Ordenamiento */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select 
              value={filtroTipo} 
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none text-slate-700 flex-1 md:flex-none"
            >
              <option value="todos">Todos los tipos</option>
              <option value="mensual">Donación Mensual</option>
              <option value="unica">Donación Única</option>
            </select>

            <select 
              value={ordenMonto} 
              onChange={(e) => setOrdenMonto(e.target.value)}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none text-slate-700 flex-1 md:flex-none"
            >
              <option value="recientes">Más recientes</option>
              <option value="mayor">Mayor Monto</option>
              <option value="menor">Menor Monto</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b text-xs uppercase text-slate-500">
              <tr>
                <th className="p-4 font-semibold">Tipo de Colaboración</th>
                <th className="p-4 font-semibold">Monto</th>
                <th className="p-4 font-semibold">Fecha y Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {historialFiltrado.length > 0 ? (
                historialFiltrado.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-slate-900">{item.tipo}</td>
                    <td className="p-4 font-bold text-orange-600">${Number(item.monto).toFixed(2)}</td>
                    <td className="p-4 text-slate-500">{item.fechaHora}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-slate-400">No hay donaciones registradas con este filtro.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

const InputGroup = ({ label, value, onChange, editando }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <input
      disabled={!editando}
      value={value}
      onChange={onChange}
      className={`p-4 rounded-2xl border transition-all text-slate-800 outline-none ${editando ? "border-orange-500 bg-white ring-2 ring-orange-100" : "border-gray-200 bg-gray-50"}`}
    />
  </div>
);

export default Perfil;