package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "apellido", nullable = false, length = 100)
    private String apellido;

    @Column(name = "correo", nullable = false, length = 150, unique = true)
    private String correo;

    @Column(name = "contrasena", nullable = false, length = 255)
    private String contrasena;

    @Column(name = "telefono", length = 20)
    private String telefono;

    @Column(name = "direccion", length = 255)
    private String direccion;

    @Enumerated(EnumType.STRING)
    @Column(name = "rol", nullable = false)
    private RolUsuario rol = RolUsuario.ADOPTANTE;

    @Column(name = "estado", nullable = false)
    private Boolean estado = true;

    @Column(name = "fecha_registro",
            nullable = false,
            updatable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    public enum RolUsuario {
        ADMIN,
        ADOPTANTE
    }
}