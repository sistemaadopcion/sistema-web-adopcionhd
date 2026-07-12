import React, { useEffect, useState } from "react";
import {
  obtenerTodasLasMascotas,
  registrarMascota,
  actualizarMascota,
  eliminarMascota,
} from "../../services/mascotaService";

const GestionMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // ESTADO CORREGIDO: 'tamanio' coincide con tu atributo en Java
  const [form, setForm] = useState({
    nombre: "",
    especie: "PERRO",
    edad: "",
    estado: "DISPONIBLE",
    raza: "",
    sexo: "MACHO",
    tamanio: "MEDIANO",
    fechaIngreso: "",
    foto: "",
    descripcion: "",
  });

  useEffect(() => {
    cargarMascotas();
  }, []);

  const cargarMascotas = async () => {
    try {
      // CAMBIO: Usa el nombre correcto de la función importada
      const data = await obtenerTodasLasMascotas();
      setMascotas(data);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await actualizarMascota(editingId, form);
      } else {
        await registrarMascota(form);
      }
      setIsModalOpen(false);
      cargarMascotas();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error: Verifica que todos los campos sean correctos.");
    }
  };

  const openModal = (m = null) => {
    if (m) {
      setEditingId(m.id);
      setForm({ ...m });
    } else {
      setEditingId(null);
      setForm({
        nombre: "",
        especie: "PERRO",
        edad: "",
        estado: "DISPONIBLE",
        raza: "",
        sexo: "MACHO",
        tamanio: "MEDIANO",
        fechaIngreso: "",
        foto: "",
        descripcion: "",
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>🐾 Gestión de Mascotas</h1>       {" "}
        <button
          type="button"
          onClick={() => openModal()}
          style={{
            background: "#27ae60",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Nueva Mascota        {" "}
        </button>{" "}
      </div>{" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: "28px",
          marginTop: "35px",
        }}
      >
        {" "}
        {mascotas.map((m) => (
          <div
            key={m.id}
            style={{
              background: "#fff",
              borderRadius: 22,
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              transition: ".3s",
              border: "1px solid #ececec",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={m.foto || "https://via.placeholder.com/600"}
                alt={m.nombre}
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                }}
              />

              <span
                style={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                  padding: "8px 15px",
                  borderRadius: 30,
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#fff",
                  background: m.estado === "DISPONIBLE" ? "#22c55e" : "#ef4444",
                }}
              >
                {m.estado}
              </span>
            </div>

            <div style={{ padding: 22 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 24,
                      color: "#0f172a",
                    }}
                  >
                    {m.nombre}
                  </h2>

                  <p
                    style={{
                      marginTop: 5,
                      color: "#64748b",
                    }}
                  >
                    {m.raza}
                  </p>
                </div>

                <div style={{ fontSize: 35 }}>
                  {m.especie === "PERRO" ? "🐶" : "🐱"}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginTop: 18,
                  fontSize: 14,
                }}
              >
                <div>
                  <strong>Edad</strong>
                  <br />
                  {m.edad} años
                </div>

                <div>
                  <strong>Sexo</strong>
                  <br />
                  {m.sexo}
                </div>

                <div>
                  <strong>Tamaño</strong>
                  <br />
                  {m.tamanio}
                </div>

                <div>
                  <strong>Ingreso</strong>
                  <br />
                  {m.fechaIngreso}
                </div>
              </div>

              <p
                style={{
                  marginTop: 18,
                  color: "#475569",
                  lineHeight: 1.6,
                }}
              >
                {m.descripcion}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 22,
                }}
              >
                <button
                  type="button"
                  onClick={() => openModal(m)}
                  style={{
                    flex: 1,
                    border: "none",
                    padding: "12px",
                    borderRadius: 12,
                    background: "#f97316",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("¿Eliminar mascota?")) {
                      eliminarMascota(m.id).then(cargarMascotas);
                    }
                  }}
                  style={{
                    width: 55,
                    border: "none",
                    borderRadius: 12,
                    background: "#ef4444",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                >
                  🗑
                </button>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
        ))}
      </div>{" "}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            padding: 20,
          }}
        >
          {" "}
          <div
            style={{
              width: "100%",
              maxWidth: "950px",
              background: "#fff",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,.25)",
            }}
          >
            {/* HEADER */}

            <div
              style={{
                background: "linear-gradient(135deg,#f97316,#ea580c)",
                color: "#fff",
                padding: "22px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ margin: 0 }}>
                  {editingId ? "Editar Mascota" : "Registrar Mascota"}
                </h2>

                <p style={{ marginTop: 6, opacity: 0.9 }}>
                  Completa la información de la mascota.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: 28,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* CONTENIDO */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
                gap: 35,
                padding: 30,
              }}
            >
              {/* FORMULARIO */}

              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <Input
                    label="Nombre"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                  />

                  <Input
                    label="Raza"
                    value={form.raza}
                    onChange={(e) => setForm({ ...form, raza: e.target.value })}
                  />

                  <Input
                    label="Edad"
                    value={form.edad}
                    onChange={(e) => setForm({ ...form, edad: e.target.value })}
                  />

                  <Input
                    type="date"
                    label="Fecha"
                    value={form.fechaIngreso}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        fechaIngreso: e.target.value,
                      })
                    }
                  />

                  <Select
                    label="Especie"
                    value={form.especie}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        especie: e.target.value,
                      })
                    }
                  >
                    <option value="PERRO">Perro</option>
                    <option value="GATO">Gato</option>
                    <option value="OTRO">Otro</option>
                  </Select>

                  <Select
                    label="Sexo"
                    value={form.sexo}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sexo: e.target.value,
                      })
                    }
                  >
                    <option value="MACHO">Macho</option>
                    <option value="HEMBRA">Hembra</option>
                  </Select>

                  <Select
                    label="Tamaño"
                    value={form.tamanio}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tamanio: e.target.value,
                      })
                    }
                  >
                    <option value="PEQUENIO">Pequeño</option>
                    <option value="MEDIANO">Mediano</option>
                    <option value="GRANDE">Grande</option>
                  </Select>

                  <Select
                    label="Estado"
                    value={form.estado}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        estado: e.target.value,
                      })
                    }
                  >
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="ADOPTADO">Adoptado</option>
                  </Select>
                </div>

                <div style={{ marginTop: 18 }}>
                  <Input
                    label="URL de la imagen"
                    value={form.foto}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        foto: e.target.value,
                      })
                    }
                  />
                </div>

                <div style={{ marginTop: 18 }}>
                  <label
                    style={{
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Descripción
                  </label>

                  <textarea
                    rows={5}
                    value={form.descripcion}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        descripcion: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: 14,
                      borderRadius: 12,
                      border: "1px solid #d6d6d6",
                      resize: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* VISTA PREVIA */}

              <div>
                <div
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#fafafa",
                  }}
                >
                  <img
                    src={
                      form.foto ||
                      "https://via.placeholder.com/500x350?text=Vista+Previa"
                    }
                    alt=""
                    style={{
                      width: "100%",
                      height: 260,
                      objectFit: "cover",
                    }}
                  />

                  <div style={{ padding: 20 }}>
                    <h2 style={{ margin: 0 }}>
                      {form.nombre || "Nombre de la mascota"}
                    </h2>

                    <p style={{ color: "#64748b" }}>{form.raza || "Raza"}</p>

                    <p style={{ marginTop: 15 }}>
                      {form.descripcion ||
                        "Aquí aparecerá la descripción de la mascota."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div
              style={{
                borderTop: "1px solid #eee",
                padding: 22,
                display: "flex",
                justifyContent: "flex-end",
                gap: 15,
              }}
            >
              {" "}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "12px 22px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  background: "#fff",
                }}
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                style={{
                  padding: "12px 28px",
                  borderRadius: 10,
                  border: "none",
                  background: "#f97316",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {editingId ? "Actualizar" : "Guardar"}
              </button>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
      )}
      {" "}
    </div>
  );
};

export default GestionMascotas;
