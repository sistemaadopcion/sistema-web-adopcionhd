import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Loader2, UserCheck, Mail, Phone, RefreshCw } from 'lucide-react';

const GestionVoluntariado = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/voluntarios/solicitudes');
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta solicitud?")) {
      try {
        await axios.delete(`http://localhost:8080/api/voluntarios/${id}`);
        // Actualización inmediata del estado sin necesidad de recargar la API
        setSolicitudes(solicitudes.filter(s => s.id !== id));
      } catch (error) {
        alert("Error al eliminar la solicitud.");
      }
    }
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Gestión de Voluntarios</h1>
        <button 
          onClick={fetchSolicitudes} 
          className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition"
        >
          <RefreshCw size={16} /> Actualizar
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-orange-500" size={48} />
        </div>
      ) : (
        <div className="grid gap-4">
          {solicitudes.length > 0 ? (
            solicitudes.map((s) => (
              <div 
                key={s.id} 
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900">
                    <UserCheck className="text-green-500" size={20}/> 
                    {s.nombreCompleto}
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4 mt-2 text-slate-500 text-sm">
                    <span className="flex items-center gap-1"><Mail size={14}/> {s.email}</span>
                    <span className="flex items-center gap-1"><Phone size={14}/> {s.telefono}</span>
                  </div>
                  <p className="mt-4 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                    {s.motivacion}
                  </p>
                </div>
                <button 
                  onClick={() => handleDelete(s.id)} 
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-3 rounded-full font-bold hover:bg-red-100 transition"
                >
                  <Trash2 size={18} /> Eliminar
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 py-10">No hay solicitudes pendientes en este momento.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GestionVoluntariado;