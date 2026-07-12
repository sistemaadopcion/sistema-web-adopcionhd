// Detecta la URL de entorno o usa localhost por defecto
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/mascotas`;

// ─── GET: Listar todas las mascotas ────
export const obtenerTodasLasMascotas = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
  
  return await response.json();
};

// ─── GET: Listar mascotas disponibles ───
export const obtenerMascotasDisponibles = async () => {
  const response = await fetch(`${API_URL}/disponibles`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
  
  return await response.json();
};

// ─── POST: Registrar nueva mascota ─────────────────────
export const registrarMascota = async (mascotaData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mascotaData),
  });

  if (!response.ok) {
    const error = await response.text();
    console.log(error); // <-- IMPORTANTE
    throw new Error(error);
  }

  return await response.json();
};

// ─── PUT: Actualizar mascota ──────────────────────────
export const actualizarMascota = async (id, mascotaData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mascotaData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
  
  return await response.json();
};

// ─── DELETE: Eliminar mascota ──────────────────────────
export const eliminarMascota = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
  
  return true;
};