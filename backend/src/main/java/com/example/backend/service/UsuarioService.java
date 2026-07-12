package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ─── Registrar nuevo usuario ───────────────────────────
    public Usuario registrar(Usuario usuario) {
        // Verificar si el correo ya existe
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new RuntimeException("El correo ya está registrado: "
                    + usuario.getCorreo());
        }
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        return usuarioRepository.save(usuario);
    }

    // ─── Autenticar usuario (login) ────────────────────────
    public Usuario autenticar(String correo, String contrasenaPlano) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(contrasenaPlano, usuario.getContrasena())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return usuario;
    }

    // ─── Listar todos los usuarios ─────────────────────────
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // ─── Buscar usuario por ID ─────────────────────────────
    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    // ─── Buscar usuario por correo ─────────────────────────
    public Optional<Usuario> buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    // ─── Actualizar usuario ────────────────────────────────
    // ─── Actualizar usuario (con lógica de contraseña inteligente) ──
    public Usuario actualizar(Integer id, Usuario usuarioActualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Usuario no encontrado con ID: " + id));

        // Actualizamos campos generales
        usuarioExistente.setNombre(usuarioActualizado.getNombre());
        usuarioExistente.setApellido(usuarioActualizado.getApellido());
        usuarioExistente.setTelefono(usuarioActualizado.getTelefono());
        usuarioExistente.setDireccion(usuarioActualizado.getDireccion());
        usuarioExistente.setRol(usuarioActualizado.getRol());
        usuarioExistente.setEstado(usuarioActualizado.getEstado());

        // LÓGICA INTELIGENTE:
        // Solo actualizamos la contraseña si el frontend envió una nueva
        if (usuarioActualizado.getContrasena() != null && !usuarioActualizado.getContrasena().trim().isEmpty()) {
            usuarioExistente.setContrasena(passwordEncoder.encode(usuarioActualizado.getContrasena().trim()));
        }

        return usuarioRepository.save(usuarioExistente);
    }

    // ─── Eliminar usuario ──────────────────────────────────
    public void eliminar(Integer id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException(
                    "Usuario no encontrado con ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    // ─── Listar usuarios por rol ───────────────────────────
    public List<Usuario> listarPorRol(Usuario.RolUsuario rol) {
        return usuarioRepository.findByRol(rol);
    }
    // Dentro de UsuarioService.java

    public Map<String, Object> obtenerDashboardStats(Integer id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Aquí construirías el mapa basado en tus repositorios (ej: mascotaRepository,
        // solicitudRepository)
        // Esto es un ejemplo, adáptalo según tus entidades reales:
        Map<String, Object> stats = new HashMap<>();
        stats.put("solicitudes", 3); // Deberías consultar solicitudRepository.countByUsuarioId(id)
        stats.put("favoritas", 2); // Deberías consultar algo similar
        stats.put("perfil", usuario.getEstado() != null ? usuario.getEstado() : "Activo");

        return stats;
    }

}