package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mascotas")
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "especie", nullable = false)
    private Especie especie;

    @Column(name = "raza", length = 100)
    private String raza;

    @Column(name = "edad")
    private Integer edad;

    @Enumerated(EnumType.STRING)
    @Column(name = "tamanio", nullable = false)
    private Tamanio tamanio;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexo", nullable = false)
    private Sexo sexo;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoMascota estado = EstadoMascota.DISPONIBLE;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "foto", length = 500)
    private String foto;

    @Column(name = "fecha_ingreso", nullable = false, updatable = false)
    private LocalDate fechaIngreso = LocalDate.now();

    // ─── Enums ─────────────────────────────────────────
    public enum Especie {
        PERRO,
        GATO,
        OTRO
    }

    public enum Tamanio {
        PEQUENIO,
        MEDIANO,
        GRANDE
    }

    public enum Sexo {
        MACHO,
        HEMBRA
    }

    public enum EstadoMascota {
        DISPONIBLE,
        EN_PROCESO,
        ADOPTADO
    }
}