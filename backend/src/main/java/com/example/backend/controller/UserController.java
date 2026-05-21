package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import java.util.Optional;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
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
    private UserService userService;//ISSUE #1:
    @Autowired
    private UserRepository userRepository;//ISSUE #2:
    // =========================================================
    // 🛡️ BLOQUE ISSUE #1: AQUÍ YA TIENES TU REGISTRO (¡NO LO BORRES!)
    // =========================================================

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
    // =========================================================
    // 🔐 BLOQUE ISSUE #2: PEGA ESTO AQUÍ ABAJO (MÉTODO NUEVO)
    // =========================================================
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        // 1. Criterio: Validación de campos obligatorios
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() ||
            loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Todos los campos son obligatorios.");
        }

        // 2. Criterio: Verificación de credenciales en la Base de Datos
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        
        // Criterio: Mensaje si el usuario no existe
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no existe.");
        }

        User user = userOptional.get();

        // Criterio: Mensaje si las credenciales son incorrectas
        // NOTA: Si usan texto plano para las pruebas, déjalo así. Si usan BCrypt, luego lo cambiamos por .matches()
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta.");
        }

        // Si todo coincide, mandamos al Frontend el usuario con su ROL para que sepa a dónde redirigir
        return ResponseEntity.ok(user);
    }
}