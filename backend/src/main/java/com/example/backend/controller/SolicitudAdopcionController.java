package com.example.backend.controller;

import com.example.backend.model.Mascota;
import com.example.backend.model.SolicitudAdopcion;
import com.example.backend.model.Usuario;
import com.example.backend.repository.MascotaRepository;
import com.example.backend.repository.SolicitudAdopcionRepository;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.service.SolicitudAdopcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/solicitudes-adopcion")
public class SolicitudAdopcionController {

    @Autowired private SolicitudAdopcionService solicitudService;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private MascotaRepository mascotaRepository;
    @Autowired private SolicitudAdopcionRepository solicitudRepository;

    @GetMapping
    public ResponseEntity<List<SolicitudAdopcion>> listarTodas() {
        return ResponseEntity.ok(solicitudService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitudAdopcion> buscarPorId(@PathVariable Integer id) {
        return solicitudService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody SolicitudAdopcion solicitud) {
        try {
            if (solicitud.getUsuario() == null || solicitud.getMascota() == null) {
                return ResponseEntity.badRequest().body("Usuario y Mascota son obligatorios");
            }

            // 1. Validar si ya existe una solicitud ENVIADA para esta mascota
            boolean existe = solicitudRepository.existsByUsuarioIdAndMascotaIdAndEstadoSolicitud(
                    solicitud.getUsuario().getId(), 
                    solicitud.getMascota().getId(), 
                    SolicitudAdopcion.EstadoSolicitud.ENVIADA
            );

            if (existe) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Ya tienes una solicitud enviada para esta mascota. Espera a que sea revisada.");
            }

            // 2. Buscar entidades
            Usuario usuario = usuarioRepository.findById(solicitud.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            Mascota mascota = mascotaRepository.findById(solicitud.getMascota().getId())
                    .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

            solicitud.setUsuario(usuario);
            solicitud.setMascota(mascota);
            solicitud.setEstadoSolicitud(SolicitudAdopcion.EstadoSolicitud.ENVIADA);
            solicitud.setFechaSolicitud(LocalDateTime.now());

            return ResponseEntity.status(HttpStatus.CREATED).body(solicitudService.registrar(solicitud));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<SolicitudAdopcion>> listarPorUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(solicitudService.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}/aprobar")
    public ResponseEntity<SolicitudAdopcion> aprobar(@PathVariable Integer id) {
        try { return ResponseEntity.ok(solicitudService.aprobar(id)); }
        catch (RuntimeException e) { return ResponseEntity.notFound().build(); }
    }

    @PutMapping("/{id}/rechazar")
    public ResponseEntity<SolicitudAdopcion> rechazar(@PathVariable Integer id, @RequestParam(required = false) String observaciones) {
        String obs = (observaciones != null) ? observaciones : "Sin observaciones";
        return ResponseEntity.ok(solicitudService.rechazar(id, obs));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        solicitudService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}