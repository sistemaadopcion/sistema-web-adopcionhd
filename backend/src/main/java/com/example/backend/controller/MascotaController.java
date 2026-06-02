package com.example.backend.controller;

import com.example.backend.model.Mascota;
import com.example.backend.service.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mascotas")
public class MascotaController {

    @Autowired
    private MascotaService mascotaService;

    // ─── GET: Listar todas las mascotas ────────────────────
    @GetMapping
    public ResponseEntity<List<Mascota>> listarTodas() {
        List<Mascota> mascotas = mascotaService.listarTodas();
        return ResponseEntity.ok(mascotas);
    }

    // ─── GET: Listar mascotas disponibles ──────────────────
    @GetMapping("/disponibles")
    public ResponseEntity<List<Mascota>> listarDisponibles() {
        List<Mascota> mascotas = mascotaService.listarDisponibles();
        return ResponseEntity.ok(mascotas);
    }

    // ─── GET: Buscar mascota por ID ────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<Mascota> buscarPorId(@PathVariable Integer id) {
        Optional<Mascota> mascota = mascotaService.buscarPorId(id);
        if (mascota.isPresent()) {
            return ResponseEntity.ok(mascota.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── POST: Registrar nueva mascota ─────────────────────
    @PostMapping
    public ResponseEntity<Mascota> registrar(@RequestBody Mascota mascota) {
        try {
            Mascota mascotaRegistrada = mascotaService.registrar(mascota);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(mascotaRegistrada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ─── PUT: Actualizar mascota ───────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<Mascota> actualizar(
            @PathVariable Integer id,
            @RequestBody Mascota mascotaActualizada) {
        try {
            Mascota mascota = mascotaService.actualizar(id, mascotaActualizada);
            return ResponseEntity.ok(mascota);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── PUT: Cambiar estado de mascota ────────────────────
    @PutMapping("/{id}/estado")
    public ResponseEntity<Mascota> cambiarEstado(
            @PathVariable Integer id,
            @RequestParam Mascota.EstadoMascota nuevoEstado) {
        try {
            Mascota mascota = mascotaService.cambiarEstado(id, nuevoEstado);
            return ResponseEntity.ok(mascota);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── DELETE: Eliminar mascota ──────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        try {
            mascotaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── GET: Buscar mascotas por especie ──────────────────
    @GetMapping("/especie/{especie}")
    public ResponseEntity<List<Mascota>> buscarPorEspecie(
            @PathVariable Mascota.Especie especie) {
        List<Mascota> mascotas = mascotaService.buscarPorEspecie(especie);
        return ResponseEntity.ok(mascotas);
    }
}