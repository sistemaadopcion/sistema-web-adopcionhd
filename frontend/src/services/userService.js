const API_URL = "http://localhost:8080/api/users";

export const registerService = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  // Si el backend responde con error (404 si no existe, 401 si la clave está mal)
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText); // Captura el mensaje exacto del backend
  }

  return await response.json(); // Retorna el objeto del usuario con su ROL
};