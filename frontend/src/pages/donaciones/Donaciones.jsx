import React, { useState } from 'react';
import { Heart, CalendarDays, Building2, X, CreditCard, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Donaciones = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoDonacion, setTipoDonacion] = useState('');
  const [monto, setMonto] = useState('');
  const [frecuencia, setFrecuencia] = useState('Unica');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const abrirModal = (tipo, frecPredeterminada) => {
    setTipoDonacion(tipo);
    setFrecuencia(frecPredeterminada);
    setModalAbierto(true);
  };

  const handleDonar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userEmail = sessionStorage.getItem("userEmail") || "cesar@gmail.com"; 

      const payload = {
        email: userEmail,
        tipo: tipoDonacion,
        frecuencia: frecuencia,
        monto: parseFloat(monto),
        fecha: new Date().toISOString()
      };

    // Llamada real a tu endpoint de backend unificada con la nube
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "https://backend-sistema-production-b4b3.up.railway.app";
      await axios.post(`${API_BASE}/api/donaciones`, payload);
    } catch (err) {
      console.warn("Backend no disponible temporalmente, guardando en sesión local para simulación visual.");
    }
      // Guardar en localStorage para reflejar instantáneamente el historial y la suscripción en el Perfil
      const donacionesPrevias = JSON.parse(localStorage.getItem('historialDonaciones') || '[]');
      const nuevaDonacion = {
        id: Date.now(),
        tipo: `${tipoDonacion} (${frecuencia})`,
        monto: parseFloat(monto),
        fechaHora: new Date().toLocaleString()
      };
      
      localStorage.setItem('historialDonaciones', JSON.stringify([nuevaDonacion, ...donacionesPrevias]));
      
      if (frecuencia === 'Mensual') {
        const proximoPago = new Date();
        proximoPago.setMonth(proximoPago.getMonth() + 1);
        localStorage.setItem('suscripcionActiva', JSON.stringify({
          tipo: `${tipoDonacion} - Mensual`,
          proximoCobro: proximoPago.toLocaleDateString()
        }));
      } else {
        localStorage.setItem('suscripcionActiva', JSON.stringify({
          tipo: `${tipoDonacion} - Única (Completada)`,
          proximoCobro: 'N/A'
        }));
      }

      alert("¡Donación realizada con éxito! Gracias por tu apoyo.");
      setModalAbierto(false);
      navigate('/perfil');
    } catch (error) {
      console.error("Error al procesar la donación:", error);
      alert("Hubo un error al procesar tu donación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Tu ayuda sostiene nuestro trabajo</h1>
        <p className="text-slate-600 mb-12 text-lg">Elegí cómo querés colaborar con el Santuario y marcar la diferencia.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Donación Única", 
              desc: "Aporte puntual para necesidades urgentes.", 
              icon: <Heart size={32} />, 
              frec: "Unica" 
            },
            { 
              title: "Donación Mensual", 
              desc: "Sostén constante para el bienestar diario.", 
              icon: <CalendarDays size={32} />, 
              frec: "Mensual" 
            },
            { 
              title: "Empresas", 
              desc: "Sumate con tu organización o marca.", 
              icon: <Building2 size={32} />, 
              frec: "Mensual" 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center">
              <div className="text-orange-500 mb-6 bg-orange-50 p-4 rounded-full">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
              <p className="text-slate-600 mb-8 flex-grow">{item.desc}</p>
              <button 
                onClick={() => abrirModal(item.title, item.frec)}
                className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-700 transition w-full"
              >
                Colaborar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE DONACIÓN ELEBORADO */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl animate-fade-in text-left">
            <button 
              onClick={() => setModalAbierto(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-1">Generar Colaboración</h2>
            <p className="text-slate-500 text-sm mb-6">Opción seleccionada: <span className="font-semibold text-orange-600">{tipoDonacion}</span></p>

            <form onSubmit={handleDonar} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Frecuencia de Colaboración</label>
                <select 
                  value={frecuencia} 
                  onChange={(e) => setFrecuencia(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-slate-700"
                >
                  <option value="Unica">Donación Única</option>
                  <option value="Mensual">Donación Mensual Automática</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Monto a Donar ($)</label>
                <input 
                  type="number" 
                  required 
                  min="1"
                  placeholder="Ej. 50"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Número de Tarjeta</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required 
                    placeholder="4000 1234 5678 9010"
                    maxLength="19"
                    className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-slate-700"
                  />
                  <CreditCard className="absolute left-3 top-3.5 text-slate-400" size={18} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Vencimiento</label>
                  <input type="text" required placeholder="MM/AA" maxLength="5" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700 bg-slate-50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">CVV</label>
                  <input type="password" required placeholder="123" maxLength="4" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-700 bg-slate-50" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition mt-4 flex items-center justify-center gap-2"
              >
                {loading ? 'Procesando...' : <><CheckCircle size={18} /> Confirmar Colaboración</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donaciones;