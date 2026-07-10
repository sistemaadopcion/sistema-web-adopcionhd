package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private Integer id;

    @Column(name = "fecha_solicitud", nullable = false)
    private LocalDateTime fechaSolicitud = LocalDateTime.now();

    // Ajustado para coincidir con el CHECK CONSTRAINT de la base de datos
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_solicitud", nullable = false, length = 20)
    private EstadoSolicitud estadoSolicitud = EstadoSolicitud.ENVIADA;

    @Column(name = "tipo_vivienda", length = 50)
    private String tipoVivienda;

    @Column(name = "espacio_adecuado", length = 10)
    private String espacioAdecuado;
    
    @Column(name = "motivo", columnDefinition = "TEXT")
    private String motivo;
    
    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;

    // Cambiado a EAGER para evitar LazyInitializationException en el controlador
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "solicitudes"})
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mascota_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "solicitudes"})
    private Mascota mascota;

    // Definición exacta de los estados permitidos por tu base de datos
    public enum EstadoSolicitud { 
        ENVIADA, 
        EN_REVISION, 
        APROBADA, 
        DENEGADA 
    }
}