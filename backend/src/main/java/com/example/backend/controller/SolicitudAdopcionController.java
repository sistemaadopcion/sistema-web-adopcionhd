package com.example.backend.controller;

import com.example.backend.model.SolicitudAdopcion;
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

    // ─── GET: Listar todas las solicitudes ─────────────────
    @GetMapping
    public ResponseEntity<List<SolicitudAdopcion>> listarTodas() {
        List<SolicitudAdopcion> solicitudes = solicitudService.listarTodas();
        return ResponseEntity.ok(solicitudes);
    }

    // ─── GET: Buscar solicitud por ID ──────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<SolicitudAdopcion> buscarPorId(@PathVariable Integer id) {
        Optional<SolicitudAdopcion> solicitud = solicitudService.buscarPorId(id);
        if (solicitud.isPresent()) {
            return ResponseEntity.ok(solicitud.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── POST: Registrar nueva solicitud ───────────────────
    @PostMapping
    public ResponseEntity<SolicitudAdopcion> registrar(
            @RequestBody SolicitudAdopcion solicitud) {
        try {
            SolicitudAdopcion solicitudRegistrada =
                    solicitudService.registrar(solicitud);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(solicitudRegistrada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ─── GET: Listar solicitudes por usuario ───────────────
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<SolicitudAdopcion>> listarPorUsuario(
            @PathVariable Integer usuarioId) {
        List<SolicitudAdopcion> solicitudes =
                solicitudService.listarPorUsuario(usuarioId);
        return ResponseEntity.ok(solicitudes);
    }

    // ─── GET: Listar solicitudes por estado ────────────────
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<SolicitudAdopcion>> listarPorEstado(
            @PathVariable SolicitudAdopcion.EstadoSolicitud estado) {
        List<SolicitudAdopcion> solicitudes =
                solicitudService.listarPorEstado(estado);
        return ResponseEntity.ok(solicitudes);
    }

    // ─── PUT: Aprobar solicitud ────────────────────────────
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<SolicitudAdopcion> aprobar(@PathVariable Integer id) {
        try {
            SolicitudAdopcion solicitud = solicitudService.aprobar(id);
            return ResponseEntity.ok(solicitud);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── PUT: Rechazar solicitud ───────────────────────────
    @PutMapping("/{id}/rechazar")
    public ResponseEntity<SolicitudAdopcion> rechazar(
            @PathVariable Integer id,
            @RequestParam String observaciones) {
        try {
            SolicitudAdopcion solicitud =
                    solicitudService.rechazar(id, observaciones);
            return ResponseEntity.ok(solicitud);
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