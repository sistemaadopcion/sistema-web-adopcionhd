package com.example.backend.repository;

import com.example.backend.model.SolicitudAdopcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SolicitudAdopcionRepository extends JpaRepository<SolicitudAdopcion, Integer> {

    // Buscar solicitudes por usuario
    List<SolicitudAdopcion> findByUsuarioId(Integer usuarioId);

    // Buscar solicitudes por mascota
    List<SolicitudAdopcion> findByMascotaId(Integer mascotaId);

    // Buscar solicitudes por estado
    List<SolicitudAdopcion> findByEstadoSolicitud(
            SolicitudAdopcion.EstadoSolicitud estadoSolicitud);

    // Buscar solicitudes de un usuario por estado
    List<SolicitudAdopcion> findByUsuarioIdAndEstadoSolicitud(
            Integer usuarioId,
            SolicitudAdopcion.EstadoSolicitud estadoSolicitud);

    // NUEVO: Validar si ya existe una solicitud activa para evitar duplicados
    boolean existsByUsuarioIdAndMascotaIdAndEstadoSolicitud(
            Integer usuarioId, 
            Integer mascotaId, 
            SolicitudAdopcion.EstadoSolicitud estadoSolicitud);
}