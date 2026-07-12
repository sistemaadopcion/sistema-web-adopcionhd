// Wrapper sobre fetch que añade el JWT guardado en sessionStorage a las
// llamadas que requieren sesión iniciada, y limpia la sesión si el backend
// responde 401/403 (token ausente, expirado o sin permisos).
export const authFetch = async (url, options = {}) => {
  const token = sessionStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    sessionStorage.clear();
    window.location.href = "/login";
  }

  return response;
};
