package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Verifica si el correo ya existe en la base de datos
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email); //esta línea dentro para que la base de datos sepa buscar por texto
}
