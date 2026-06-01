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
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody User user) {
        try {

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

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        // Validación de campos obligatorios
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() ||
            loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Todos los campos son obligatorios.");
        }

        // Credenciales predefinidas para administrador
        String adminEmail = "admin@canmartin.com";
        String adminPassword = "admin123";

        if (loginRequest.getEmail().equalsIgnoreCase(adminEmail)) {
            if (loginRequest.getPassword().equals(adminPassword)) {
                User adminUser = new User();
                adminUser.setNombres("Administrador General");
                adminUser.setEmail(adminEmail);
                adminUser.setRole("ADMIN");

                return ResponseEntity.ok(adminUser);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Contraseña incorrecta.");
            }
        }

        // Flujo normal para adoptantes
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El usuario no existe.");
        }

        User user = userOptional.get();

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Contraseña incorrecta.");
        }

        return ResponseEntity.ok(user);
    }
}