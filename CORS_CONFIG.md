# Configuración CORS

## ¿Qué es CORS?

CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad que permite que aplicaciones web alojadas en diferentes orígenes (dominios, puertos) se comuniquen entre sí.

## Orígenes permitidos

| Origen | Descripción |
|--------|-------------|
| `http://localhost:5173` | Vite (React dev server) |
| `http://localhost:3000` | Create React App |
| `http://localhost:4200` | Angular |

## Métodos HTTP permitidos

- `GET` - Obtener datos
- `POST` - Crear datos
- `PUT` - Actualizar datos
- `DELETE` - Eliminar datos
- `PATCH` - Actualización parcial
- `OPTIONS` - Verificación CORS

## Headers permitidos

- `Authorization` - Para JWT tokens
- `Content-Type` - Para especificar el formato (JSON)
- `Accept` - Para indicar qué formatos se aceptan
- `X-Requested-With` - Para XMLHttpRequest
- `Access-Control-Allow-Origin` - Para CORS

## Agregar nuevos orígenes

Si necesitas agregar un nuevo origen (por ejemplo, en producción), edita `backend/src/main/java/com/example/backend/config/CorsConfig.java`:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173",
    "http://localhost:3000",
    "https://tudominio.com",      // ← agregar aquí
    "https://www.tudominio.com"
));
```

## En Producción

Antes de desplegar a producción:

1. Cambiar los orígenes a los URLs reales de tu aplicación
2. Implementar autenticación JWT en lugar de permitir todo
3. Reducir el tiempo de cache (`MaxAge`)

Ejemplo para producción:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "https://adopcion-canmartin.com"
));
```

## Testing desde el frontend

Si usas React con Vite, no necesitas hacer nada especial. Solo asegúrate de:

```javascript
// En tu servicio/API cliente
const API_URL = 'http://localhost:8080/api';

fetch(`${API_URL}/usuarios`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error CORS:', err));
```