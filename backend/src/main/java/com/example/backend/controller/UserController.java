package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Conexión con React
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody User user) {
        try {
            // Validaciones de criterios de aceptación de la Issue
            if (user.getTelefono() == null || user.getTelefono().length() != 9) {
                return ResponseEntity.badRequest().body("El teléfono debe tener exactamente 9 dígitos.");
            }
            if (!user.getEmail().contains("@")) {
                return ResponseEntity.badRequest().body("El formato del correo es inválido.");
            }

            User nuevoUsuario = userService.registrarUsuario(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}