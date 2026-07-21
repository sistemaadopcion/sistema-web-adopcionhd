// src/services/solicitudService.js

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/solicitudes-adopcion`;

/**
 * Obtiene todas las solicitudes de adopción registradas.
 */
export const obtenerSolicitudes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener la lista de solicitudes');
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerSolicitudes:", error);
    throw error;
  }
};

/**
 * Registra una nueva solicitud.
 */
export const registrarSolicitud = async (solicitudData) => {
  console.log("URL:", API_URL);
  console.log("Datos:", solicitudData);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(solicitudData),
  });

  console.log("Status:", response.status);

  const text = await response.text();
  console.log("Respuesta:", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
};
/**
 * Registra una nueva solicitud.
 */
export const registrarSolicitud = async (solicitudData) => {
  console.log("URL:", API_URL);
  console.log("Datos:", solicitudData);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(solicitudData),
  });

  console.log("Status:", response.status);

  const text = await response.text();
  console.log("Respuesta:", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
};

/**
 * Actualiza el estado de una solicitud (Aprobar o Denegar).
 */
export const actualizarEstadoSolicitud = async (id, nuevoEstado, observaciones = "Sin observaciones") => {
  try {
    // Definimos la acción según el estado recibido
    const accion = nuevoEstado === 'APROBADA' ? 'aprobar' : 'rechazar';
    let url = `${API_URL}/${id}/${accion}`;

    // Si es rechazada, adjuntamos las observaciones como parámetro
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
    return await response.json();
  } catch (error) {
    console.error("Error en actualizarEstadoSolicitud:", error);
    throw error;
  }
};

/**
 * Obtiene las solicitudes específicas de un usuario por su ID.
 */
export const obtenerSolicitudesPorUsuario = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/usuario/${userId}`);
    if (!response.ok) throw new Error("Error al obtener solicitudes del usuario");
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerSolicitudesPorUsuario:", error);
    throw error;
  }
};