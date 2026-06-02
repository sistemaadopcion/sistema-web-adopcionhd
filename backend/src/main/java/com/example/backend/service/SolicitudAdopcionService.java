package com.example.backend.service;

import com.example.backend.model.Mascota;
import com.example.backend.model.SolicitudAdopcion;
import com.example.backend.repository.MascotaRepository;
import com.example.backend.repository.SolicitudAdopcionRepository;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolicitudAdopcionService {

    @Autowired
    private SolicitudAdopcionRepository solicitudRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MascotaRepository mascotaRepository;

    // ─── Registrar nueva solicitud ─────────────────────────
    public SolicitudAdopcion registrar(SolicitudAdopcion solicitud) {
        // Verificar que el usuario existe
        usuarioRepository.findById(solicitud.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException(
                        "Usuario no encontrado con ID: "
                                + solicitud.getUsuario().getId()));

        // Verificar que la mascota existe
        Mascota mascota = mascotaRepository
                .findById(solicitud.getMascota().getId())
                .orElseThrow(() -> new RuntimeException(
                        "Mascota no encontrada con ID: "
                                + solicitud.getMascota().getId()));

        // Verificar que la mascota esté disponible
        if (mascota.getEstado() != Mascota.EstadoMascota.DISPONIBLE) {
            throw new RuntimeException(
                    "La mascota no está disponible para adopción");
        }

        // Cambiar estado de la mascota a EN_PROCESO
        mascota.setEstado(Mascota.EstadoMascota.EN_PROCESO);
        mascotaRepository.save(mascota);

        return solicitudRepository.save(solicitud);
    }

    // ─── Listar todas las solicitudes ──────────────────────
    public List<SolicitudAdopcion> listarTodas() {
        return solicitudRepository.findAll();
    }

    // ─── Buscar solicitud por ID ───────────────────────────
    public Optional<SolicitudAdopcion> buscarPorId(Integer id) {
        return solicitudRepository.findById(id);
    }

    // ─── Listar solicitudes por usuario ───────────────────
    public List<SolicitudAdopcion> listarPorUsuario(Integer usuarioId) {
        return solicitudRepository.findByUsuarioId(usuarioId);
    }

    // ─── Listar solicitudes por estado ────────────────────
    public List<SolicitudAdopcion> listarPorEstado(
            SolicitudAdopcion.EstadoSolicitud estado) {
        return solicitudRepository.findByEstadoSolicitud(estado);
    }

    // ─── Aprobar solicitud ─────────────────────────────────
    public SolicitudAdopcion aprobar(Integer id) {
        SolicitudAdopcion solicitud = solicitudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Solicitud no encontrada con ID: " + id));

        // Aprobar la solicitud
        solicitud.setEstadoSolicitud(
                SolicitudAdopcion.EstadoSolicitud.APROBADO);

        // Cambiar estado de la mascota a ADOPTADO
        Mascota mascota = solicitud.getMascota();
        mascota.setEstado(Mascota.EstadoMascota.ADOPTADO);
        mascotaRepository.save(mascota);

        return solicitudRepository.save(solicitud);
    }

    // ─── Rechazar solicitud ────────────────────────────────
    public SolicitudAdopcion rechazar(Integer id, String observaciones) {
        SolicitudAdopcion solicitud = solicitudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Solicitud no encontrada con ID: " + id));

        // Rechazar la solicitud
        solicitud.setEstadoSolicitud(
                SolicitudAdopcion.EstadoSolicitud.RECHAZADO);
        solicitud.setObservaciones(observaciones);

        // Devolver la mascota a DISPONIBLE
        Mascota mascota = solicitud.getMascota();
        mascota.setEstado(Mascota.EstadoMascota.DISPONIBLE);
        mascotaRepository.save(mascota);

        return solicitudRepository.save(solicitud);
    }

    // ─── Eliminar solicitud ────────────────────────────────
    public void eliminar(Integer id) {
        if (!solicitudRepository.existsById(id)) {
            throw new RuntimeException(
                    "Solicitud no encontrada con ID: " + id);
        }
        solicitudRepository.deleteById(id);
    }
}