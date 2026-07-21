package com.example.backend.controller;

import com.example.backend.model.Usuario;
import com.example.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // ─── GET: Listar todos los usuarios ────────────────────
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        List<Usuario> usuarios = usuarioService.listarTodos();
        return ResponseEntity.ok(usuarios);
    }

    // ─── GET: Buscar usuario por ID ────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── POST: Registrar nuevo usuario ─────────────────────
    @PostMapping
    public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario) {
        try {
            Usuario usuarioRegistrado = usuarioService.registrar(usuario);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(usuarioRegistrado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ─── PUT: Actualizar usuario ──────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(
            @PathVariable Integer id,
            @RequestBody Usuario usuarioActualizado) {
        try {
            Usuario usuario = usuarioService.actualizar(id, usuarioActualizado);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── PATCH: Activar / Desactivar usuario ─────────────────────
@PatchMapping("/{id}/estado")
public ResponseEntity<Usuario> cambiarEstado(@PathVariable Integer id) {
    try {
        Usuario usuario = usuarioService.cambiarEstado(id);
        return ResponseEntity.ok(usuario);
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();
    }
}

   

    // ─── GET: Buscar usuario por correo ────────────────────
    @GetMapping("/correo/{correo}")
    public ResponseEntity<Usuario> buscarPorCorreo(@PathVariable String correo) {
        Optional<Usuario> usuario = usuarioService.buscarPorCorreo(correo);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ─── POST: Iniciar Sesión ──────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        // Buscamos ignorando espacios accidentales en el correo
        Optional<Usuario> usuarioOpt = usuarioService.buscarPorCorreo(loginRequest.getCorreo().trim());

        if (usuarioOpt.isPresent()) {
            Usuario user = usuarioOpt.get();
            // Comparamos usando .trim() para limpiar espacios invisibles de la base de
            // datos
            if (user.getContrasena().trim().equals(loginRequest.getContrasena().trim())) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
    }

    // Agrega esto dentro de tu clase UsuarioController
    @GetMapping("/stats/{id}")
    public ResponseEntity<Map<String, Object>> getStats(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(usuarioService.obtenerDashboardStats(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    
}