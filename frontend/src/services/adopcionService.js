// Detecta la URL de entorno o usa localhost por defecto
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/solicitudes-adopcion`;

// 1. Obtener todas las solicitudes (Para el Admin)
export const obtenerSolicitudes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener solicitudes');
  return response.json();
};

// 2. Aprobar o Rechazar una solicitud (CORREGIDO)
export const actualizarEstadoSolicitud = async (id, nuevoEstado, observaciones = "Sin observaciones") => {
  // Ajustamos los nombres para coincidir con el backend
  const accion = nuevoEstado === 'APROBADA' ? 'aprobar' : 'rechazar';
  
  // URL base sin parámetros
  let url = `${API_URL}/${id}/${accion}`;
  
  // Solo si es rechazar, añadimos el parámetro
  if (nuevoEstado === 'RECHAZADA') {
    url += `?observaciones=${encodeURIComponent(observaciones)}`;
  }
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (!response.ok) throw new Error("Error en el servidor");
  return response.json();
};

// 3. Registrar nueva solicitud
export const registrarSolicitud = async (solicitudData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(solicitudData),
  });
  
  if (!response.ok) throw new Error('Error al registrar solicitud');
  return response.json();
};

// 4. Obtener solicitudes por usuario
export const obtenerSolicitudesPorUsuario = async (userId) => {
  const response = await fetch(`${API_URL}/usuario/${userId}`);
  if (!response.ok) throw new Error("Error al obtener solicitudes");
  return await response.json();
};