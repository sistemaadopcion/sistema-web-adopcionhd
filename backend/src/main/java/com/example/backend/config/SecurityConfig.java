package com.example.backend.config;

import com.example.backend.security.JwtAuthenticationEntryPoint;
import com.example.backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;  // ← inyectar desde CorsConfig

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {
        http
                // Habilitar CORS (inyectado desde CorsConfig)
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                // Deshabilitar CSRF: API stateless con JWT, no hay sesión/cookies que proteger
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .exceptionHandling(handling -> handling.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                // Autorización de rutas
                .authorizeHttpRequests(auth -> auth
                        // ─── Público ────────────────────────────────
                        // /error: Spring Boot reenvía aquí las respuestas de error (403, 500, etc.)
                        // y ese reenvío vuelve a pasar por este filtro de seguridad; si no se permite,
                        // una denegación 403 legítima se sobreescribe con un 401 del entry point.
                        .requestMatchers("/error").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/usuarios").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/usuarios/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/mascotas/**").permitAll()

                        // ─── Solo ADMIN ─────────────────────────────
                        .requestMatchers(HttpMethod.POST, "/api/mascotas/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/mascotas/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/mascotas/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/usuarios").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/usuarios/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/solicitudes-adopcion").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/solicitudes-adopcion/estado/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/solicitudes-adopcion/*/aprobar").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/solicitudes-adopcion/*/rechazar").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/solicitudes-adopcion/**").hasRole("ADMIN")

                        // ─── Resto de /api/**: cualquier usuario autenticado ──
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
