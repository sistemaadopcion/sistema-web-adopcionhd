# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Sistema de Adopción de Mascotas ("Can Martín") — a pet adoption management platform. Client-server architecture: React (Vite) frontend talking over REST/JSON to a Spring Boot backend, backed by PostgreSQL (Supabase-hosted). Academic project (Herramientas de Desarrollo de Software, UTP).

## Commands

### Frontend (`frontend/`)
```bash
cd frontend
npm install
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build
npm run lint      # ESLint
npm run preview   # preview production build
```
There is no frontend test runner configured.

### Backend (`backend/`)
```bash
cd backend
./mvnw spring-boot:run     # run API at http://localhost:8080 (mvnw.cmd on Windows)
./mvnw test                 # run tests
./mvnw test -Dtest=ClassName#methodName   # run a single test
./mvnw clean package        # build jar
```
Backend currently has only the default `BackendApplicationTests` context-load test — no real test coverage exists yet.

## Architecture

### Backend layering (`backend/src/main/java/com/example/backend/`)
Standard Spring Boot layering, one package per concern:
- `controller/` — `@RestController`s under `/api/**` (e.g. `UsuarioController`, `MascotaController`, `SolicitudAdopcionController`). Controllers catch `RuntimeException` from the service layer and translate to 400/404 responses.
- `service/` — `@Service` + `@Transactional` business logic; this is where cross-entity rules live (e.g. `SolicitudAdopcionService` flips `Mascota.estado` between `DISPONIBLE`/`EN_PROCESO`/`ADOPTADO` when a solicitud is created/approved/rejected).
- `repository/` — Spring Data JPA interfaces.
- `model/` — JPA entities (`Usuario`, `Mascota`, `SolicitudAdopcion`) using Lombok `@Data`. Enums are nested inside the entity that owns them (e.g. `Mascota.Especie`, `Mascota.EstadoMascota`, `Usuario.RolUsuario`, `SolicitudAdopcion.EstadoSolicitud`).
- `config/` — `CorsConfig` (allowed origins list, shared as a `CorsConfigurationSource` bean) and `SecurityConfig` (wires that bean into the security filter chain).
- `dto/` — currently minimal (`LoginRequest`); most endpoints accept/return entities directly rather than DTOs.

**Auth model**: There is no JWT/session auth. `SecurityConfig` permits all `/api/**` requests (`permitAll()`), and login (`POST /api/usuarios/login`) does a plaintext password comparison against the stored `contrasena` column. The frontend tracks the logged-in role client-side via `sessionStorage` (`userRole`). Treat this as a known gap, not a pattern to extend — don't assume any endpoint is actually protected server-side.

**Database reality vs. docs**: `application.properties` points at a Postgres/Supabase instance with `spring.jpa.hibernate.ddl-auto=update`, so Hibernate auto-creates/updates the schema from the entities at boot. `docs/database/init.sql` and the root `README.md`, by contrast, describe a manual MySQL setup (`canmartin_db`) — that script is not what actually provisions the live schema. When adding/changing entity fields, the Postgres DB updates itself on next boot; don't expect `init.sql` to be in sync.

### Frontend structure (`frontend/src/`)
- `pages/` — route-level components, grouped by role/domain: `auth/` (Login, Register), `mascotas/` (public catalog + detail), `adopciones/` (adoptante dashboard, formulario, mis solicitudes, perfil), `admin/` (admin dashboard, gestión de mascotas, solicitudes, usuarios), plus `Home.jsx`.
- `components/` — presentational components grouped by area (`admin/`, `layout/`, `mascotas/`).
- `layouts/` — `AdminLayout.jsx` wraps admin pages.
- `services/` — one file per backend resource (`mascotaService.js`, `userService.js`, `adopcionService.js`), each using raw `fetch` against a hardcoded `const API_URL = "http://localhost:8080/api/..."` at the top of the file. There is no shared Axios instance or central API base-URL config despite `axios` being a dependency — if you add a new service file, follow the existing per-file `fetch` + hardcoded URL pattern for consistency, or raise centralizing it explicitly rather than mixing patterns.
- Routing lives in `App.jsx` using `react-router-dom`; role-gating (`ADMIN` vs adoptante) is done inline in `<Route>` elements by checking the `userRole` state (sourced from `sessionStorage`), not via a dedicated guard/route component.
- Styling: Tailwind CSS (`tailwind.config.js`, `postcss.config.js`) plus some plain CSS (`App.css`).

### Entities and relationships
- `Usuario` (`usuarios`): `rol` enum `ADMIN`/`ADOPTANTE`.
- `Mascota` (`mascotas`): `especie` (`PERRO`/`GATO`/`OTRO`), `tamanio` (`PEQUENIO`/`MEDIANO`/`GRANDE`), `sexo`, `estado` (`DISPONIBLE`/`EN_PROCESO`/`ADOPTADO`).
- `SolicitudAdopcion` (`solicitudes_adopcion`): `@ManyToOne` to both `Usuario` and `Mascota` (lazy-fetched, `@JsonIgnoreProperties` on the Hibernate proxy fields to keep JSON serialization clean); `estadoSolicitud` (`PENDIENTE`/`APROBADO`/`RECHAZADO`) drives the `Mascota.estado` transitions mentioned above.

### CORS
Allowed origins are hardcoded in `backend/.../config/CorsConfig.java` (`localhost:5173`, `:3000`, `:4200` and their `127.0.0.1` equivalents). To add a new frontend origin (e.g. a deployed URL), edit that list directly — see `CORS_CONFIG.md` for more detail.
