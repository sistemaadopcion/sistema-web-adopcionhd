const API_URL = "http://localhost:8080/api/solicitudes-adopcion";

// 1. Obtener todas las solicitudes (Para el Admin)
export const obtenerSolicitudes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener solicitudes');
  return response.json();
};

// 2. Aprobar o Rechazar una solicitud
export const actualizarEstadoSolicitud = async (id, nuevoEstado, observaciones = "Sin observaciones") => {
  // Ajustamos endpoint según tu controlador Java
  const accion = nuevoEstado === 'APROBADO' ? 'aprobar' : 'rechazar';
  
  // Construcción de URL según el método PUT
  let url = `${API_URL}/${id}/${accion}`;
  if (nuevoEstado === 'RECHAZADO') {
    url += `?observaciones=${encodeURIComponent(observaciones)}`;
  }
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (!response.ok) throw new Error(`Error al ${accion} la solicitud`);
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
}; // <--- AQUÍ SE CIERRA CORRECTAMENTE LA FUNCIÓN registrarSolicitud

// 4. Obtener solicitudes por usuario
export const obtenerSolicitudesPorUsuario = async (userId) => {
  const response = await fetch(`${API_URL}/usuario/${userId}`);
  if (!response.ok) throw new Error("Error al obtener solicitudes");
  return await response.json();
};