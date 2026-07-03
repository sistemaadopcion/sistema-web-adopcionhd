import React, { useState } from "react";
import { loginService } from "../../services/userService";

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.correo || !formData.contrasena) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const user = await loginService(formData);
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("userId", user.id);
      const rolDelServidor = user.rol || "ADOPTANTE";
      const formatoRol = rolDelServidor.toUpperCase();

      sessionStorage.setItem("userRole", formatoRol);
      sessionStorage.setItem("userName", user.nombre || "Usuario");

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(formatoRol);
      }
      window.location.href = "/";
    } catch (err) {
      setError("Credenciales incorrectas o error de conexión");
    }
  };

  const styles = {
    pageWrapper: {
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "24px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      border: "1px solid #f1f5f9"
    },
    title: { textAlign: "center", marginBottom: "8px", color: "#0f172a", fontSize: "1.75rem", fontWeight: "700" },
    subtitle: { textAlign: "center", marginBottom: "32px", color: "#64748b", fontSize: "0.95rem" },
    inputGroup: { marginBottom: "20px" },
    label: { display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: "600", color: "#475569" },
    input: {
      width: "100%", padding: "14px 16px", fontSize: "1rem", border: "2px solid #e2e8f0",
      borderRadius: "12px", boxSizing: "border-box", transition: "all 0.3s ease", outline: "none"
    },
    button: {
      width: "100%", padding: "14px", marginTop: "10px", background: "#0f172a", color: "white",
      border: "none", borderRadius: "12px", fontSize: "1rem", fontWeight: "600", cursor: "pointer",
      transition: "background 0.3s ease"
    },
    errorAlert: {
      backgroundColor: "#fee2e2", color: "#991b1b", padding: "12px 16px", borderRadius: "12px",
      marginBottom: "20px", fontSize: "0.85rem", fontWeight: "500", border: "1px solid #fecaca"
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Bienvenido</h2>
        <p style={styles.subtitle}>Ingresa a tu cuenta para continuar</p>
        
        {error && <div style={styles.errorAlert}>⚠️ {error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo electrónico</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} 
                   style={styles.input} placeholder="ejemplo@correo.com" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} 
                   style={styles.input} placeholder="••••••••" />
          </div>
          <button type="submit" style={styles.button} 
                  onMouseOver={(e) => e.target.style.background = "#1e293b"} 
                  onMouseOut={(e) => e.target.style.background = "#0f172a"}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;