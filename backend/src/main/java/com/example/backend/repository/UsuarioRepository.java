package com.example.backend.repository;

import com.example.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Buscar usuario por correo (útil para login)
    Optional<Usuario> findByCorreo(String correo);

    // Verificar si un correo ya existe (útil para registro)
    boolean existsByCorreo(String correo);

    // Buscar usuarios por rol
    java.util.List<Usuario> findByRol(Usuario.RolUsuario rol);

    // Buscar usuarios activos/inactivos
    java.util.List<Usuario> findByEstado(Boolean estado);
}