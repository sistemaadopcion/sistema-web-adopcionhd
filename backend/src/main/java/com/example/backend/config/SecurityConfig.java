package com.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(csrf -> csrf.disable()) // CSRF desactivado para permitir peticiones POST desde el frontend
            .authorizeHttpRequests(auth -> auth
                // Permitimos acceso total a todo lo que esté bajo /api/
                .requestMatchers("/api/**").permitAll()
                // Si tienes alguna ruta que no sea /api, aquí es donde pedirá login
                .anyRequest().authenticated()
            );

        return http.build();
    }
}