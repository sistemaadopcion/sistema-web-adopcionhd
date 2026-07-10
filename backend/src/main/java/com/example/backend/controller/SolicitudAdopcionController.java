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

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/solicitudes-adopcion")
public class SolicitudAdopcionController {

    @Autowired
    private SolicitudAdopcionService solicitudService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MascotaRepository mascotaRepository;

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
            // 1. Validar IDs
            if (solicitud.getUsuario() == null || solicitud.getUsuario().getId() == null ||
                solicitud.getMascota() == null || solicitud.getMascota().getId() == null) {
                return ResponseEntity.badRequest().body("Usuario y Mascota son obligatorios");
            }

            // 2. Buscar entidades reales
            Usuario usuario = usuarioRepository.findById(solicitud.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + solicitud.getUsuario().getId()));
            Mascota mascota = mascotaRepository.findById(solicitud.getMascota().getId())
                    .orElseThrow(() -> new RuntimeException("Mascota no encontrada con ID: " + solicitud.getMascota().getId()));

            // 3. Asignación forzada de campos críticos
            solicitud.setUsuario(usuario);
            solicitud.setMascota(mascota);
            
            // IMPORTANTE: Sincronizado con el valor real de tu BD (ENVIADA)
            solicitud.setEstadoSolicitud(SolicitudAdopcion.EstadoSolicitud.ENVIADA);
            
            if (solicitud.getFechaSolicitud() == null) {
                solicitud.setFechaSolicitud(LocalDateTime.now());
            }

            // 4. Guardar
            SolicitudAdopcion registrada = solicitudService.registrar(solicitud);
            return ResponseEntity.status(HttpStatus.CREATED).body(registrada);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error crítico al registrar: " + e.getMessage());
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<SolicitudAdopcion>> listarPorUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(solicitudService.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}/aprobar")
    public ResponseEntity<SolicitudAdopcion> aprobar(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(solicitudService.aprobar(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/rechazar")
    public ResponseEntity<SolicitudAdopcion> rechazar(@PathVariable Integer id, @RequestParam String observaciones) {
        try {
            return ResponseEntity.ok(solicitudService.rechazar(id, observaciones));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

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