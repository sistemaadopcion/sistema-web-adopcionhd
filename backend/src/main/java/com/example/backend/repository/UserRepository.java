package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Verifica si el correo ya existe en la base de datos
    boolean existsByEmail(String email);

    // Busca un usuario por correo para el login
    Optional<User> findByEmail(String email);
}