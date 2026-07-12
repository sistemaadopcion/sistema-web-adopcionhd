// Detecta la URL de entorno o usa localhost por defecto
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/usuarios`;

// ─── AUTENTICACIÓN Y REGISTRO ──────────────────────────

export const registerService = async (userData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
  return await response.json();
};

export const loginService = async (loginData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
  return await response.json(); 
};

// ─── GESTIÓN DE USUARIOS ───────────────────────────────

export const obtenerUsuarios = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  
  if (!response.ok) throw new Error("Error al obtener la lista de usuarios");
  return await response.json();
};

export const obtenerUsuarioPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  
  if (!response.ok) throw new Error("Error al obtener el usuario");
  return await response.json();
};

export const actualizarUsuario = async (id, userData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) throw new Error("Error al actualizar el usuario");
  return await response.json();
};

export const cambiarEstadoUsuario = async (id) => {
  const response = await fetch(`${API_URL}/${id}/estado`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo cambiar el estado del usuario.");
  }

  return await response.json();
};

// ─── DASHBOARD ──────────────────────────────────────────

export const obtenerDashboardData = async (userId) => {
  const response = await fetch(`${API_URL}/stats/${userId}`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) throw new Error("Error al obtener estadísticas del dashboard");
  return await response.json();
};