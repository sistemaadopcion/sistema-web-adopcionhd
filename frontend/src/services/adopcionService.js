const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/solicitudes-adopcion`;

export const obtenerSolicitudes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener solicitudes');
  return response.json();
};

export const actualizarEstadoSolicitud = async (id, nuevoEstado, observaciones = "Sin observaciones") => {
  const accion = nuevoEstado === 'APROBADA' ? 'aprobar' : 'rechazar';
  
  let url = `${API_URL}/${id}/${accion}`;
  
  if (nuevoEstado === 'RECHAZADA') {
    url += `?observaciones=${encodeURIComponent(observaciones)}`;
  }
  
  // PARA EL PUT: No enviamos body, ni tampoco el header 'Content-Type' 
  // que suele causar conflictos si no hay cuerpo JSON.
  const response = await fetch(url, {
    method: 'PUT'
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al actualizar estado");
  }
  return response.json();
};

export const registrarSolicitud = async (solicitudData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(solicitudData),
  });
  
  if (!response.ok) throw new Error('Error al registrar solicitud');
  return response.json();
};

export const obtenerSolicitudesPorUsuario = async (userId) => {
  const response = await fetch(`${API_URL}/usuario/${userId}`);
  if (!response.ok) throw new Error("Error al obtener solicitudes");
  return await response.json();
};