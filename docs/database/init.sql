-- ============================================================
-- BASE DE DATOS: Sistema de Adopción - Can Martín
-- UTP 2026 - Herramientas de Desarrollo
-- ============================================================
-- INSTRUCCIONES PARA CONTRIBUYENTES:
-- 1. Tener MySQL corriendo (puerto 3306)
-- 2. Abrir MySQL Workbench o phpMyAdmin
-- 3. Ejecutar este script completo
-- 4. Configurar application.properties con tus credenciales
-- ============================================================

CREATE DATABASE IF NOT EXISTS canmartin_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE canmartin_db;

-- ============================================================
-- TABLA: usuarios
-- ============================================================
CREATE TABLE IF NOT EXISTS usuarios (
                                        id              INT          NOT NULL AUTO_INCREMENT,
                                        nombre          VARCHAR(100) NOT NULL,
    apellido        VARCHAR(100) NOT NULL,
    correo          VARCHAR(150) NOT NULL UNIQUE,
    contrasena      VARCHAR(255) NOT NULL,
    telefono        VARCHAR(20)      NULL,
    direccion       VARCHAR(255)     NULL,
    rol             ENUM('ADMIN','ADOPTANTE')
    NOT NULL DEFAULT 'ADOPTANTE',
    estado          TINYINT(1)   NOT NULL DEFAULT 1,
    fecha_registro  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_usuarios PRIMARY KEY (id)
    );

-- ============================================================
-- TABLA: mascotas
-- ============================================================
CREATE TABLE IF NOT EXISTS mascotas (
                                        id              INT          NOT NULL AUTO_INCREMENT,
                                        nombre          VARCHAR(100) NOT NULL,
    especie         ENUM('PERRO','GATO','OTRO')         NOT NULL,
    raza            VARCHAR(100)     NULL,
    edad            INT              NULL,
    tamanio         ENUM('PEQUENIO','MEDIANO','GRANDE') NOT NULL,
    sexo            ENUM('MACHO','HEMBRA')              NOT NULL,
    estado          ENUM('DISPONIBLE','EN_PROCESO','ADOPTADO')
    NOT NULL DEFAULT 'DISPONIBLE',
    descripcion     TEXT             NULL,
    foto            VARCHAR(500)     NULL,
    fecha_ingreso   DATE         NOT NULL,
    CONSTRAINT pk_mascotas PRIMARY KEY (id)
    );

-- ============================================================
-- TABLA: solicitudes_adopcion
-- ============================================================
CREATE TABLE IF NOT EXISTS solicitudes_adopcion (
                                                    id               INT      NOT NULL AUTO_INCREMENT,
                                                    fecha_solicitud  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                    estado_solicitud ENUM('PENDIENTE','APROBADO','RECHAZADO')
    NOT NULL DEFAULT 'PENDIENTE',
    observaciones    TEXT         NULL,
    usuario_id       INT      NOT NULL,
    mascota_id       INT      NOT NULL,
    CONSTRAINT pk_solicitudes       PRIMARY KEY (id),
    CONSTRAINT fk_solicitud_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id),
    CONSTRAINT fk_solicitud_mascota FOREIGN KEY (mascota_id)
    REFERENCES mascotas(id)
    );

-- ============================================================
-- DATOS DE PRUEBA
-- ============================================================
INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol, estado)
VALUES
    ('Admin', 'Sistema', 'admin@canmartin.com', 'admin123', 'ADMIN',     1),
    ('Juan',  'Pérez',   'juan@email.com',      'juan123',  'ADOPTANTE', 1);

INSERT INTO mascotas (nombre, especie, raza, edad, tamanio, sexo, estado, descripcion, fecha_ingreso)
VALUES
    ('Luna',  'PERRO', 'Labrador', 2, 'MEDIANO',  'HEMBRA', 'DISPONIBLE', 'Perrita cariñosa y juguetona', CURDATE()),
    ('Michi', 'GATO',  'Siamés',   1, 'PEQUENIO', 'MACHO',  'DISPONIBLE', 'Gatito tranquilo y amigable',  CURDATE());

INSERT INTO solicitudes_adopcion (estado_solicitud, observaciones, usuario_id, mascota_id)
VALUES ('PENDIENTE', 'Me gustaría adoptar a Luna, tengo espacio en casa.', 2, 1);