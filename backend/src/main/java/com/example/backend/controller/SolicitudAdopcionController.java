package com.example.backend.controller;

import com.example.backend.model.Mascota;
import com.example.backend.model.SolicitudAdopcion;
import com.example.backend.model.Usuario;
import com.example.backend.repository.MascotaRepository;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.service.SolicitudAdopcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/solicitudes-adopcion")
public class SolicitudAdopcionController {

    @Autowired
    private SolicitudAdopcionService solicitudService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MascotaRepository mascotaRepository;

    // ─── GET: Listar todas las solicitudes ─────────────────
    @GetMapping
    public ResponseEntity<List<SolicitudAdopcion>> listarTodas() {
        return ResponseEntity.ok(solicitudService.listarTodas());
    }

    // ─── GET: Buscar solicitud por ID ──────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<SolicitudAdopcion> buscarPorId(@PathVariable Integer id) {
        return solicitudService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ─── POST: Registrar nueva solicitud ───────────────────
    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody SolicitudAdopcion solicitud) {
        try {
            // Validar existencia de usuario y mascota
            Usuario usuario = usuarioRepository.findById(solicitud.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            Mascota mascota = mascotaRepository.findById(solicitud.getMascota().getId())
                    .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

            // Asignar entidades completas
            solicitud.setUsuario(usuario);
            solicitud.setMascota(mascota);
            solicitud.setEstadoSolicitud(SolicitudAdopcion.EstadoSolicitud.PENDIENTE);
            
            SolicitudAdopcion registrada = solicitudService.registrar(solicitud);
            return ResponseEntity.status(HttpStatus.CREATED).body(registrada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al registrar solicitud: " + e.getMessage());
        }
    }

    // ─── GET: Listar solicitudes por usuario ───────────────
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<SolicitudAdopcion>> listarPorUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(solicitudService.listarPorUsuario(usuarioId));
    }

    // ─── PUT: Aprobar solicitud ────────────────────────────
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<SolicitudAdopcion> aprobar(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(solicitudService.aprobar(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── PUT: Rechazar solicitud ───────────────────────────
    @PutMapping("/{id}/rechazar")
    public ResponseEntity<SolicitudAdopcion> rechazar(@PathVariable Integer id, @RequestParam String observaciones) {
        try {
            return ResponseEntity.ok(solicitudService.rechazar(id, observaciones));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── DELETE: Eliminar solicitud ────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        try {
            solicitudService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}