import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart, Home, ShieldCheck, Clock } from 'lucide-react';

const FormularioAdopcion = () => {
  const params = useParams();
  // Capturamos el id de la mascota sin importar cómo se llame el parámetro en tu Route (idMascota o id)
  const idMascota = params.idMascota || params.id;
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    tipoVivienda: 'Casa',
    espacioAdecuado: 'Si',
    tieneMascotas: '',
    experienciaMascotas: '',
    motivoAdopcion: '',
    ocupacionTiempo: '',
    aceptaCompromiso: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.aceptaCompromiso) {
      alert("Debes aceptar el compromiso de cuidado responsable.");
      return;
    }

    setLoading(true);

    try {
      // 1. Obtener ID de usuario de la sesión
      const userId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
      
      if (!userId) {
        alert("⚠️ No hay sesión activa. Por favor, inicia sesión nuevamente.");
        setLoading(false);
        navigate('/login');
        return;
      }

      // 2. Validar que la mascota tenga un ID válido
      if (!idMascota) {
        alert("⚠️ Error crítico: No se reconoció el ID de la mascota en la URL.");
        setLoading(false);
        return;
      }

      // Creamos el payload asegurando que ambos IDs sean números enteros válidos
      const solicitudPayload = {
        usuario: { id: parseInt(userId, 10) },
        mascota: { id: parseInt(idMascota, 10) },
        tipoVivienda: formData.tipoVivienda,
        espacioAdecuado: formData.espacioAdecuado,
        tieneMascotas: formData.tieneMascotas,
        motivo: formData.motivoAdopcion,
        ocupacion: formData.ocupacionTiempo
      };

      console.log("Enviando payload al backend:", solicitudPayload);

      // Petición al backend
      await axios.post('http://localhost:8080/api/solicitudes-adopcion', solicitudPayload);

      alert("¡Solicitud enviada al administrador con éxito!");
      navigate('/mis-solicitudes');

    } catch (error) {
      console.error("Error al enviar solicitud al backend:", error);
      const mensajeBackend = error.response?.data?.message || error.response?.data || error.message;
      alert("Error al enviar la solicitud al servidor: " + (typeof mensajeBackend === 'object' ? JSON.stringify(mensajeBackend) : mensajeBackend));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
            Solicitud de Adopción <Heart className="text-orange-500 fill-orange-500" size={28} />
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Completa este formulario detallado para evaluar tu solicitud. (Mascota ID: {idMascota || "No detectado"})
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2 flex items-center gap-1">
                <Home size={16} className="text-orange-500" /> Tipo de vivienda:
              </label>
              <select 
                value={formData.tipoVivienda}
                onChange={(e) => setFormData({...formData, tipoVivienda: e.target.value})}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 text-slate-700 font-medium"
              >
                <option value="Casa">Casa propia o alquilada con patio</option>
                <option value="Departamento">Departamento</option>
                <option value="Finca">Finca / Casa de campo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2 flex items-center gap-1">
                <ShieldCheck size={16} className="text-orange-500" /> ¿Espacio adecuado?
              </label>
              <div className="flex gap-6 pt-3">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input 
                    type="radio" 
                    name="espacio" 
                    value="Si" 
                    checked={formData.espacioAdecuado === 'Si'}
                    onChange={(e) => setFormData({...formData, espacioAdecuado: e.target.value})}
                    className="accent-orange-500 w-4 h-4"
                  /> Sí
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input 
                    type="radio" 
                    name="espacio" 
                    value="No" 
                    checked={formData.espacioAdecuado === 'No'}
                    onChange={(e) => setFormData({...formData, espacioAdecuado: e.target.value})}
                    className="accent-orange-500 w-4 h-4"
                  /> No
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2 flex items-center gap-1">
              <Clock size={16} className="text-orange-500" /> ¿Cuánto tiempo pasa sola la mascota en casa al día?
            </label>
            <input 
              type="text" 
              required
              placeholder="Ej. Máximo 4 horas..."
              value={formData.ocupacionTiempo}
              onChange={(e) => setFormData({...formData, ocupacionTiempo: e.target.value})}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 text-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
              ¿Tienes otras mascotas actualmente? Cuéntanos cuáles y su temperamento:
            </label>
            <textarea 
              rows="2"
              required
              placeholder="Ej. Ninguna..."
              value={formData.tieneMascotas}
              onChange={(e) => setFormData({...formData, tieneMascotas: e.target.value})}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 text-slate-700 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
              ¿Por qué quieres adoptar a esta mascota y cómo planeas integrarla a tu familia?
            </label>
            <textarea 
              rows="3"
              required
              placeholder="Cuéntanos tus motivaciones..."
              value={formData.motivoAdopcion}
              onChange={(e) => setFormData({...formData, motivoAdopcion: e.target.value})}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 text-slate-700 resize-none"
            />
          </div>

          <div className="flex items-start gap-3 bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
            <input 
              type="checkbox" 
              id="compromiso"
              checked={formData.aceptaCompromiso}
              onChange={(e) => setFormData({...formData, aceptaCompromiso: e.target.checked})}
              className="mt-1 accent-orange-600 w-5 h-5 rounded cursor-pointer"
            />
            <label htmlFor="compromiso" className="text-sm text-slate-700 cursor-pointer font-medium">
              Acepto el compromiso de cuidado responsable, alimentación adecuada, visitas al veterinario y brindar un hogar seguro de por vida.
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2 text-lg"
          >
            {loading ? 'Enviando solicitud...' : 'Enviar Solicitud al Administrador'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioAdopcion;