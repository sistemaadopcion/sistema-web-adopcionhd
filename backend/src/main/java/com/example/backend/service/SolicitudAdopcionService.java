package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SolicitudAdopcionService {

    @Autowired private SolicitudAdopcionRepository solicitudRepository;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private MascotaRepository mascotaRepository;

    // ─── Registrar nueva solicitud ─────────────────────────
    public SolicitudAdopcion registrar(SolicitudAdopcion solicitud) {
        Usuario usuario = usuarioRepository.findById(solicitud.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Mascota mascota = mascotaRepository.findById(solicitud.getMascota().getId())
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        if (mascota.getEstado() != Mascota.EstadoMascota.DISPONIBLE) {
            throw new RuntimeException("La mascota no está disponible");
        }

        solicitud.setUsuario(usuario);
        solicitud.setMascota(mascota);
        
        mascota.setEstado(Mascota.EstadoMascota.EN_PROCESO);
        mascotaRepository.save(mascota);

        return solicitudRepository.save(solicitud);
    }

    // ─── Listar todas las solicitudes ──────────────────────
    @Transactional(readOnly = true)
    public List<SolicitudAdopcion> listarTodas() {
        return solicitudRepository.findAll();
    }

    // ─── Buscar por ID ─────────────────────────────────────
    @Transactional(readOnly = true)
    public Optional<SolicitudAdopcion> buscarPorId(Integer id) {
        return solicitudRepository.findById(id);
    }

    // ─── Listar por usuario ────────────────────────────────
    @Transactional(readOnly = true)
    public List<SolicitudAdopcion> listarPorUsuario(Integer usuarioId) {
        return solicitudRepository.findByUsuarioId(usuarioId);
    }

    // ─── Listar por estado ────────────────────────────────
    @Transactional(readOnly = true)
    public List<SolicitudAdopcion> listarPorEstado(SolicitudAdopcion.EstadoSolicitud estado) {
        return solicitudRepository.findByEstadoSolicitud(estado);
    }

    // ─── Aprobar solicitud ─────────────────────────────────
    public SolicitudAdopcion aprobar(Integer id) {
        SolicitudAdopcion solicitud = solicitudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        solicitud.setEstadoSolicitud(SolicitudAdopcion.EstadoSolicitud.APROBADO);

        Mascota mascota = solicitud.getMascota();
        mascota.setEstado(Mascota.EstadoMascota.ADOPTADO);
        mascotaRepository.save(mascota);

        return solicitudRepository.save(solicitud);
    }

    // ─── Rechazar solicitud ────────────────────────────────
    public SolicitudAdopcion rechazar(Integer id, String observaciones) {
        SolicitudAdopcion solicitud = solicitudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        solicitud.setEstadoSolicitud(SolicitudAdopcion.EstadoSolicitud.RECHAZADO);
        solicitud.setObservaciones(observaciones);

        Mascota mascota = solicitud.getMascota();
        mascota.setEstado(Mascota.EstadoMascota.DISPONIBLE);
        mascotaRepository.save(mascota);

        return solicitudRepository.save(solicitud);
    }

    // ─── Eliminar solicitud ────────────────────────────────
    public void eliminar(Integer id) {
        if (!solicitudRepository.existsById(id)) {
            throw new RuntimeException("Solicitud no encontrada");
        }
        solicitudRepository.deleteById(id);
    }
}