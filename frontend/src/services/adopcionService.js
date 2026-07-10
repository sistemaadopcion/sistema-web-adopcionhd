const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/solicitudes-adopcion`;

export const obtenerSolicitudes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener solicitudes');
  return response.json();
};

export const actualizarEstadoSolicitud = async (id, nuevoEstado, observaciones = "Sin observaciones") => {
  // Ahora el backend espera 'aprobar' o 'denegar' (o como lo hayas nombrado en tu Controller)
  // Si tu @PutMapping en Java es "/{id}/rechazar", mantén la palabra 'rechazar'
  // PERO cambia el valor del estado que envías si es necesario.
  
  const accion = nuevoEstado === 'APROBADA' ? 'aprobar' : 'rechazar';
  
  let url = `${API_URL}/${id}/${accion}`;
  
  // AHORA AQUÍ: Si el estado es DENEGADA, envíalo como tal si es que el backend lo espera
  if (nuevoEstado === 'DENEGADA') {
    url += `?observaciones=${encodeURIComponent(observaciones)}`;
  }
  
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