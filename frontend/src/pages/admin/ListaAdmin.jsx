import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react'; // Asegúrate de tener instalada esta librería

const ListaAdmin = ({ tipo }) => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const endpoint = tipo === 'donaciones' 
      ? 'http://localhost:8080/api/donaciones' 
      : 'http://localhost:8080/api/voluntarios';

    axios.get(endpoint)
      .then(res => {
        setDatos(res.data);
        setCargando(false);
      })
      .catch(err => console.error(err));
  }, [tipo]);

  // Función para eliminar un registro
  const handleEliminar = async (id) => {
    if (window.confirm(`¿Estás seguro de que querés eliminar este registro?`)) {
      try {
        const endpoint = tipo === 'donaciones' 
          ? `http://localhost:8080/api/donaciones/${id}`
          : `http://localhost:8080/api/voluntarios/${id}`;
        
        await axios.delete(endpoint);
        
        // Actualizamos la lista filtrando el elemento eliminado para no recargar la página
        setDatos(datos.filter(item => item.id !== id));
        alert("Registro eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al intentar eliminar el registro.");
      }
    }
  };

  if (cargando) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 capitalize">{tipo}</h1>
      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tipo === 'donaciones' 
                ? <><th className="px-6 py-3 text-left">Donante</th><th className="px-6 py-3 text-left">Monto</th><th className="px-6 py-3 text-left">Método</th></>
                : <><th className="px-6 py-3 text-left">Nombre</th><th className="px-6 py-3 text-left">Teléfono</th><th className="px-6 py-3 text-left">Experiencia</th></>
              }
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datos.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                {tipo === 'donaciones' 
                  ? <><td className="px-6 py-4">{item.donante}</td><td className="px-6 py-4">${item.monto}</td><td className="px-6 py-4">{item.metodoPago}</td></>
                  : <><td className="px-6 py-4">{item.nombre}</td><td className="px-6 py-4">{item.telefono}</td><td className="px-6 py-4">{item.experiencia}</td></>
                }
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => handleEliminar(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaAdmin;