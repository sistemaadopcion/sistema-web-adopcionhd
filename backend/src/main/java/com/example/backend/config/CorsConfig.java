package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // ─── Orígenes permitidos ───────────────────────────
        // Aquí van los URLs del frontend que pueden hacer requests
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",      // Vite (React)
                "http://localhost:3000",      // Create React App
                "http://localhost:4200",      // Angular
                "http://127.0.0.1:5173",
                "http://127.0.0.1:3000"
        ));

        // ─── Métodos HTTP permitidos ────────────────────────
        configuration.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS",
                "PATCH"
        ));

        // ─── Headers permitidos ─────────────────────────────
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "Accept",
                "X-Requested-With",
                "Access-Control-Allow-Origin"
        ));

        // ─── Headers expuestos al cliente ────────────────────
        configuration.setExposedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type"
        ));

        // ─── Credenciales ───────────────────────────────────
        configuration.setAllowCredentials(true);

        // ─── Tiempo máximo de cache (en segundos) ────────────
        configuration.setMaxAge(3600L);  // 1 hora

        // ─── Aplicar la configuración a todos los endpoints ──
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}