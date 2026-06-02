package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // ─── Registrar nuevo usuario ───────────────────────────
    public Usuario registrar(Usuario usuario) {
        // Verificar si el correo ya existe
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new RuntimeException("El correo ya está registrado: "
                    + usuario.getCorreo());
        }
        return usuarioRepository.save(usuario);
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
    public Usuario actualizar(Integer id, Usuario usuarioActualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Usuario no encontrado con ID: " + id));

        usuarioExistente.setNombre(usuarioActualizado.getNombre());
        usuarioExistente.setApellido(usuarioActualizado.getApellido());
        usuarioExistente.setTelefono(usuarioActualizado.getTelefono());
        usuarioExistente.setDireccion(usuarioActualizado.getDireccion());
        usuarioExistente.setRol(usuarioActualizado.getRol());
        usuarioExistente.setEstado(usuarioActualizado.getEstado());

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
}