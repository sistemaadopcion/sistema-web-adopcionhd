
# Sistema de Adopción de Mascotas 🐶🐱

## Descripción del Proyecto

Este proyecto consiste en el desarrollo de una plataforma web orientada a la gestión del proceso de adopción de mascotas, permitiendo a los usuarios visualizar mascotas disponibles, registrar solicitudes de adopción y realizar el seguimiento del proceso de manera organizada y eficiente.

El sistema busca optimizar la administración de adopciones para albergues, refugios y centros de rescate animal, facilitando tanto la gestión interna de los administradores como la experiencia de los futuros adoptantes.

A través de esta solución tecnológica, se pretende reducir los tiempos de respuesta, mejorar el control de información y brindar una experiencia más moderna, segura y accesible para todos los involucrados en el proceso de adopción.

---

## Objetivo General

Desarrollar una plataforma web moderna, escalable y eficiente que permita optimizar el proceso de adopción de mascotas mediante la automatización de registros, gestión de solicitudes y control administrativo del sistema.

---

## Objetivos Específicos

- Permitir el registro e inicio de sesión de usuarios adoptantes y administradores.
- Facilitar la visualización de mascotas disponibles para adopción.
- Gestionar las solicitudes de adopción de manera ordenada y controlada.
- Administrar el estado de cada mascota (disponible, en proceso, adoptada).
- Mejorar la trazabilidad y seguimiento de cada solicitud registrada.
- Centralizar la información del albergue en una sola plataforma digital.

---

## Tecnologías Utilizadas

### Frontend

- React
- Vite
- Axios
- React Router DOM
- HTML5
- CSS3
- JavaScript (ES6+)

### Backend

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Lombok
- Maven

### Control de Versiones

- Git
- GitHub

### Metodología de Desarrollo

- Scrum
- Git Flow
- Sprint Planning
- Product Backlog
- Sprint Backlog

---

## Arquitectura del Sistema

El proyecto sigue una arquitectura Cliente - Servidor basada en API REST.

### Estructura General

```text
Usuario
   ↓
Frontend (React)
   ↓ HTTP Requests (Axios / Fetch)
Backend (Spring Boot API REST)
   ↓
Base de Datos (MySQL)
````

### Funcionamiento

* El usuario interactúa desde la interfaz web desarrollada en React.
* El frontend consume los endpoints del backend mediante peticiones HTTP.
* Spring Boot procesa la lógica del negocio y se conecta con MySQL mediante JPA.
* La información se devuelve en formato JSON para su representación en el frontend.

---

## Estructura del Proyecto

```text
proyecto-herramientas-desarrollo/
│
├── backend/              # API REST + lógica de negocio + base de datos
│
├── frontend/             # Interfaz de usuario (React)
│
├── docs/                 # Documentación técnica del proyecto
│   │
│   ├── diagramas/        # Diagramas UML y arquitectura
│   │
│   ├── capturas/         # Evidencias visuales del desarrollo
│   │
│   └── documentacion/    # Requerimientos, backlog, manual técnico
│
└── README.md
```

---

## Funcionalidades Principales

### Módulo de Usuarios

* Registro de usuarios
* Inicio de sesión
* Gestión de perfiles
* Validación de acceso por roles

### Módulo de Mascotas

* Registro de mascotas
* Visualización de mascotas disponibles
* Edición de información
* Cambio de estado de adopción
* Filtros de búsqueda por especie, edad, tamaño, etc.

### Módulo de Solicitudes de Adopción

* Registro de solicitudes
* Seguimiento del estado de solicitud
* Aprobación o rechazo por parte del administrador
* Historial de adopciones

### Módulo Administrativo

* Gestión general del sistema
* Control de usuarios
* Gestión de mascotas
* Supervisión de solicitudes
* Panel de administración

---

## Base de Datos Inicial

Las principales entidades consideradas para la primera fase del sistema son:

* Usuario
* Mascota
* SolicitudAdopcion

Estas entidades permitirán construir el núcleo funcional del sistema antes de escalar a módulos más avanzados.

---

## Estado Actual del Proyecto

🚧 En desarrollo

Actualmente el proyecto se encuentra en la fase inicial de configuración de la arquitectura base:

* Estructura de frontend creada con React + Vite
* Estructura de backend creada con Spring Boot
* Configuración inicial de dependencias
* Organización del repositorio en GitHub
* Definición inicial de carpetas y documentación técnica

Próximamente se desarrollarán:

* CRUD de mascotas
* Sistema de autenticación
* Solicitudes de adopción
* Panel administrativo

---

## Instalación y Ejecución del Proyecto

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Servidor local:

```text
http://localhost:5173/
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

## ⚙️ Configuración de Base de Datos

### Requisitos
- MySQL 8.0 corriendo en puerto 3306
- MySQL Workbench o phpMyAdmin

### Pasos para configurar
1. Abrir MySQL Workbench
2. Abrir el archivo `docs/database/init.sql`
3. Ejecutar el script completo con `Ctrl + Shift + Enter`
4. Verificar que se creó la base de datos `canmartin_db`

### Configurar credenciales locales
Editar `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/canmartin_db
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD
```

### Tablas creadas
- `usuarios` — adoptantes y administradores
- `mascotas` — catálogo de mascotas disponibles
- `solicitudes_adopcion` — solicitudes de adopción

---

## Documentación del Proyecto

Toda la documentación técnica, diagramas UML, capturas de avance y planificación Scrum se encuentra organizada en la carpeta:

```text
docs/
```

Incluye:

* Diagramas UML
* Arquitectura del sistema
* Requerimientos funcionales y no funcionales
* Product Backlog
* Sprint Planning
* Evidencias visuales del avance
* Manual técnico

---

## Integrantes del Equipo

* César CuñachI Chávez
* José Caceres Fuertes
* Javier Rojas Espinoza
* Alan Mendoza Ramos
* Adrian Altuna Riveros


---

## Repositorio

Proyecto desarrollado con fines académicos para el curso de Herramientas de Desarrollo de Software.

Enfocado en la aplicación de buenas prácticas de desarrollo, trabajo colaborativo, control de versiones y metodologías ágiles para la construcción de soluciones tecnológicas reales.

```
```
