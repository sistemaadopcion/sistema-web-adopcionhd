package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registrarUsuario(User user) throws Exception {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("El correo electrónico ya se encuentra registrado.");
        }

        // Criterio de aceptación: Encriptar contraseña
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Criterio de aceptación: Rol por defecto ADOPTANTE
        user.setRole("ADOPTANTE");

        return userRepository.save(user);
    }
}