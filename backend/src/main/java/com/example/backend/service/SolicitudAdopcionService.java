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

    public SolicitudAdopcion registrar(SolicitudAdopcion solicitud) {
        Usuario usuario = usuarioRepository.findById(solicitud.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Mascota mascota = mascotaRepository.findById(solicitud.getMascota().getId())
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        // 1. VALIDACIÓN: Evitar duplicados si ya tiene una solicitud enviada
        boolean yaExiste = solicitudRepository.existsByUsuarioIdAndMascotaIdAndEstadoSolicitud(
            usuario.getId(), 
            mascota.getId(), 
            SolicitudAdopcion.EstadoSolicitud.ENVIADA
        );

        if (yaExiste) {
            throw new RuntimeException("Ya tienes una solicitud enviada para esta mascota. Por favor, espera a que sea revisada.");
        }

        // 2. VALIDACIÓN: Disponibilidad
        if (mascota.getEstado() != Mascota.EstadoMascota.DISPONIBLE) {
            throw new RuntimeException("La mascota no está disponible");
        }

        solicitud.setUsuario(usuario);
        solicitud.setMascota(mascota);
        solicitud.setEstadoSolicitud(SolicitudAdopcion.EstadoSolicitud.ENVIADA);
        
        mascota.setEstado(Mascota.EstadoMascota.EN_PROCESO);
        mascotaRepository.save(mascota);

        return solicitudRepository.save(solicitud);
    }

    public SolicitudAdopcion aprobar(Integer id) {
        SolicitudAdopcion solicitud = solicitudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        solicitud.setEstadoSolicitud(SolicitudAdopcion.EstadoSolicitud.APROBADA);

        Mascota mascota = solicitud.getMascota();
        mascota.setEstado(Mascota.EstadoMascota.ADOPTADO);
        mascotaRepository.save(mascota);

        return solicitudRepository.save(solicitud);
    }

   public SolicitudAdopcion rechazar(Integer id, String observaciones) {
    // 1. Buscar la solicitud
    SolicitudAdopcion solicitud = solicitudRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

    // 2. Asegurar que tenemos la mascota
    Integer mascotaId = solicitud.getMascota().getId();
    Mascota mascota = mascotaRepository.findById(mascotaId)
            .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

    // 3. CAMBIO CRÍTICO: Usamos DENEGADA (lo que espera tu DB)
    solicitud.setEstadoSolicitud(SolicitudAdopcion.EstadoSolicitud.DENEGADA);
    solicitud.setObservaciones(observaciones);
    
    // 4. Devolver la mascota a estado DISPONIBLE
    mascota.setEstado(Mascota.EstadoMascota.DISPONIBLE);

    // 5. Guardar
    mascotaRepository.save(mascota);
    return solicitudRepository.save(solicitud);
}

    @Transactional(readOnly = true)
    public List<SolicitudAdopcion> listarTodas() { return solicitudRepository.findAll(); }
    
    @Transactional(readOnly = true)
    public Optional<SolicitudAdopcion> buscarPorId(Integer id) { return solicitudRepository.findById(id); }
    
    @Transactional(readOnly = true)
    public List<SolicitudAdopcion> listarPorUsuario(Integer usuarioId) { return solicitudRepository.findByUsuarioId(usuarioId); }

    public void eliminar(Integer id) {
        if (!solicitudRepository.existsById(id)) throw new RuntimeException("Solicitud no encontrada");
        solicitudRepository.deleteById(id);
    }
}