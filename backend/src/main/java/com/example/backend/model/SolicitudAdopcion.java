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
@Table(name = "solicitudes_adopcion")
public class SolicitudAdopcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "fecha_solicitud", nullable = false, updatable = false)
    private LocalDateTime fechaSolicitud = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_solicitud", nullable = false)
    private EstadoSolicitud estadoSolicitud = EstadoSolicitud.PENDIENTE;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;

    // ─── Relación con Usuario ───────────────────────────
    // Muchas solicitudes pueden pertenecer a un usuario
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "usuario_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_solicitud_usuario")
    )
    private Usuario usuario;

    // ─── Relación con Mascota ───────────────────────────
    // Muchas solicitudes pueden apuntar a una mascota
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "mascota_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_solicitud_mascota")
    )
    private Mascota mascota;

    // ─── Enum de estados ───────────────────────────────
    public enum EstadoSolicitud {
        PENDIENTE,
        APROBADO,
        RECHAZADO
    }
}