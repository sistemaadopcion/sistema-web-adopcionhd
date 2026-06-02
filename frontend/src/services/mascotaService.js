const API_URL = "http://localhost:8080/api/mascotas";

// ─── GET: Listar todas las mascotas (Útil para el Dashboard) ────
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

// ─── GET: Listar mascotas disponibles (Para el Catálogo) ───
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mascotaData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
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