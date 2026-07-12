package com.example.backend.controller;

import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.model.Usuario;
import com.example.backend.security.JwtUtil;
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

    @Autowired
    private JwtUtil jwtUtil;

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

    // ─── DELETE: Eliminar usuario ──────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        try {
            usuarioService.eliminar(id);
            return ResponseEntity.noContent().build();
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
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Usuario usuario = usuarioService.autenticar(
                    loginRequest.getCorreo().trim(),
                    loginRequest.getContrasena().trim());

            String token = jwtUtil.generateToken(usuario);

            AuthResponse response = new AuthResponse(
                    token,
                    usuario.getId(),
                    usuario.getNombre(),
                    usuario.getApellido(),
                    usuario.getCorreo(),
                    usuario.getRol().name());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
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