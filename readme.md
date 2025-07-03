# ⚽ Tarea API - Sistema de Gestión de Jugadores de Fútbol

Una API REST completa para la gestión de jugadores de fútbol con sistema de autenticación JWT. Permite crear, leer, actualizar y eliminar jugadores con validaciones completas.

## 🚀 Stack Tecnológico

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose** - ODM para MongoDB
- **JWT (JSON Web Tokens)** - Autenticación y autorización
- **bcryptjs** - Encriptación de contraseñas
- **validator** - Validación de emails
- **crypto** - Generación de tokens seguros
- **cors** - Manejo de CORS
- **dotenv** - Gestión de variables de entorno

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd tarea-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Puerto del servidor
PORT=3000

# Base de datos MongoDB Atlas
MONGODB_URI=mongodb+srv://tu-usuario:tu-password@tu-cluster.mongodb.net/futbol-db?retryWrites=true&w=majority&appName=api-futbol

# JWT Secrets (genera tus propias claves secretas de 64 caracteres)
JWT_SECRET=tu-jwt-secret-de-64-caracteres-muy-seguro-aqui-para-produccion
JWT_REFRESH=tu-jwt-refresh-secret-de-64-caracteres-muy-seguro-aqui-para-produccion

# JWT Expiration
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
```

### 4. Configurar MongoDB Atlas

1. **Crear cuenta en MongoDB Atlas**

   - Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Regístrate con una cuenta gratuita

2. **Crear un Cluster**

   - Selecciona "Build a Database"
   - Elige el plan gratuito (M0 Sandbox)
   - Selecciona tu región preferida

3. **Configurar usuario de base de datos**

   - Ve a "Database Access" en el menú lateral
   - Click en "Add New Database User"
   - Crea un usuario con permisos de "Read and write to any database"
   - Guarda el usuario y contraseña

4. **Configurar acceso de red**

   - Ve a "Network Access"
   - Click en "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (0.0.0.0/0) para desarrollo
   - Para producción, añade solo las IPs específicas

5. **Obtener cadena de conexión**
   - Ve a "Clusters" → Click en "Connect"
   - Selecciona "Connect your application"
   - Copia la URI de conexión
   - Reemplaza `<password>` con tu contraseña de usuario

### 5. Ejecutar el proyecto

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Documentación de la API

### Base URL

```
http://localhost:3000/api
```

### 🔐 Autenticación

#### Registrar Usuario

- **POST** `/auth/register`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "email": "admin@futbol.com",
  "password": "password123",
  "role": "admin"
}
```

- **Validaciones**:
  - `email`: Requerido, formato de email válido, único
  - `password`: Requerido, mínimo 8 caracteres
  - `role`: Opcional, valores: "user", "admin" (default: "user")

#### Iniciar Sesión

- **POST** `/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "email": "admin@futbol.com",
  "password": "password123"
}
```

#### Refrescar Token

- **POST** `/auth/refresh`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "refreshToken": "tu-refresh-token-aqui"
}
```

### ⚽ Jugadores

#### Obtener Todos los Jugadores

- **GET** `/players`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Respuesta**:

```json
{
  "message": "Jugadores obtenidos correctamente:",
  "players": [
    {
      "_id": "64a1b2c3d4e5f6789012345a",
      "name": "Lionel",
      "lastName": "Messi",
      "nationality": "Argentina",
      "team": "Inter Miami",
      "age": 36,
      "number": 10,
      "value": 50000000,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Obtener Jugador por ID

- **GET** `/players/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Respuesta**:

```json
{
  "message": "Jugador obtenido correctamente",
  "player": {
    "_id": "64a1b2c3d4e5f6789012345a",
    "name": "Lionel",
    "lastName": "Messi",
    "nationality": "Argentina",
    "team": "Inter Miami",
    "age": 36,
    "number": 10,
    "value": 50000000,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Crear Jugador

- **POST** `/players`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body**:

```json
{
  "name": "Cristiano",
  "lastName": "Ronaldo",
  "nationality": "Portugal",
  "team": "Al Nassr",
  "age": 39,
  "number": 7,
  "value": 25000000
}
```

- **Validaciones**:
  - `name`: Requerido, string con trim
  - `lastName`: Requerido, string
  - `nationality`: Requerido, string
  - `team`: Requerido, string
  - `age`: Requerido, número entre 16 y 45 años
  - `number`: Requerido, número entre 1 y 99
  - `value`: Requerido, número (valor en euros/dólares)
  - **Validación única**: No puede existir otro jugador con el mismo nombre, apellido, equipo y número

#### Actualizar Jugador

- **PUT** `/players/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body**: Mismos campos que crear jugador (todos opcionales)

```json
{
  "team": "Real Madrid",
  "number": 9,
  "value": 30000000
}
```

#### Eliminar Jugador

- **DELETE** `/players/:id`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Respuesta**:

```json
{
  "message": "Jugador eliminado correctamente"
}
```

## 🔒 Sistema de Autenticación

### Middleware de Autenticación

Todas las rutas de jugadores requieren autenticación JWT. El token debe enviarse en el header:

```
Authorization: Bearer <tu-jwt-token>
```

### Roles de Usuario

- **user**: Puede ver jugadores
- **admin**: Puede crear, actualizar y eliminar jugadores

### Funcionalidades de Seguridad

- Contraseñas encriptadas con bcrypt (salt rounds: 12)
- Tokens JWT con expiración
- Refresh tokens para renovar sesiones
- Reset de contraseñas con tokens seguros
- Validación de emails con validator

## ❌ Códigos de Error y Validaciones

### Errores de Validación (400)

```json
{
  "message": "Todos los campos son requeridos"
}
```

```json
{
  "message": "La edad debe estar entre 16 y 45"
}
```

```json
{
  "message": "Un jugador con este nombre ya existe"
}
```

### Errores de Autenticación (401)

```json
{
  "message": "Token no válido"
}
```

### Errores del Servidor (500)

```json
{
  "message": "Error al crear jugador"
}
```

## 📊 Modelo de Datos

### Jugador (Player)

```javascript
{
  name: String (requerido, con trim),
  lastName: String (requerido),
  nationality: String (requerido),
  team: String (requerido),
  age: Number (requerido, min: 16, max: 45),
  number: Number (requerido, min: 1, max: 99),
  value: Number (requerido),
  createdBy: ObjectId (referencia a User),
  timestamps: true // createdAt, updatedAt automáticos
}
```

### Usuario (User)

```javascript
{
  email: String (requerido, único, validación de email),
  password: String (requerido, min: 8 caracteres, encriptado),
  role: String (enum: ["admin", "user"], default: "user"),
  refreshToken: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  timestamps: true
}
```

## 🚀 Scripts Disponibles

```bash
# Iniciar en modo desarrollo (con nodemon)
npm run dev

# Iniciar en modo producción
npm start

# Instalar dependencias
npm install
```

## 📝 Ejemplos de Uso

### 1. Registrar un administrador

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@futbol.com",
    "password": "admin123456",
    "role": "admin"
  }'
```

### 2. Iniciar sesión

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@futbol.com",
    "password": "admin123456"
  }'
```

### 3. Crear un jugador

```bash
curl -X POST http://localhost:3000/api/players \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kylian",
    "lastName": "Mbappé",
    "nationality": "Francia",
    "team": "PSG",
    "age": 25,
    "number": 7,
    "value": 180000000
  }'
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno Requeridas

- `PORT`: Puerto del servidor (default: 3000)
- `MONGODB_URI`: URI de conexión a MongoDB Atlas
- `JWT_SECRET`: Clave secreta para JWT
- `JWT_REFRESH`: Clave secreta para refresh tokens
- `JWT_EXPIRE`: Tiempo de expiración del JWT (default: 15m)
- `JWT_REFRESH_EXPIRE`: Tiempo de expiración del refresh token (default: 7d)

### Dependencias Principales

```json
{
  "express": "Framework web",
  "mongoose": "ODM para MongoDB",
  "bcryptjs": "Encriptación de contraseñas",
  "jsonwebtoken": "Manejo de JWT",
  "validator": "Validación de datos",
  "cors": "Manejo de CORS",
  "dotenv": "Variables de entorno"
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevoJugador`)
3. Commit tus cambios (`git commit -m 'Add: Nuevo sistema de jugadores'`)
4. Push a la rama (`git push origin feature/NuevoJugador`)
5. Abre un Pull Request

---
