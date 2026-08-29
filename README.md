# API REST de Servicios y Reservas - Arquitectura por Capas

Este proyecto es una API RESTful construida con Node.js y Express para la gestión integral de un sistema de turnos.

En esta versión (Pre-entrega 4), se ha refactorizado la arquitectura del proyecto implementando una clara **separación de responsabilidades** en tres capas (Rutas, Controladores y Managers), acercando el proyecto a un estándar profesional de Backend.

## 🚀 Arquitectura Implementada

El proyecto sigue una estructura organizada para separar la lógica de negocio del manejo de peticiones HTTP:

- **Routes (`src/routes`):** Exclusivas para definir los endpoints y delegar la ejecución. No contienen lógica de negocio.
- **Controllers (`src/controllers`):** Encargados de recibir las peticiones (`req`), extraer parámetros, coordinar con los Managers y devolver la respuesta (`res`). Aquí reside la validación cruzada.
- **Managers (`src/managers`):** Manejan puramente la lógica de datos e interactúan asíncronamente con el FileSystem (`fs/promises`). No tienen conocimiento de Express ni del protocolo HTTP.

## ⚙️ Tecnologías Utilizadas

- Node.js (con sintaxis ESM y módulo nativo `crypto`)
- Express.js
- Dotenv (Manejo de variables de entorno)
- FileSystem (`fs/promises`) para persistencia local
- Day.js (Para validación y formateo de fechas y horas)

## 📦 Configuración e Instalación

**1. Clonar el repositorio:**

```bash
git clone https://github.com/JoacoBalsa/Pre-Entrega-4-CoderHouse.git
cd Pre-Entrega-4-CoderHouse
```

**2. Instalar dependencias:**

```bash
npm install
```

**3. Configurar variables de entorno:**

Renombra el archivo `.env.example` a `.env` (o crea uno nuevo) e ingresa los valores necesarios:

```env
PORT=8080
NODE_ENV=development
```

**4. Ejecutar el servidor:**

Para correr el servidor utilizando el flag nativo `--watch` de Node.js:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:8080` (o el puerto definido en tu `.env`).

---

## 📡 Endpoints Disponibles

La refactorización mantiene intacto el comportamiento externo de los endpoints de versiones anteriores.

### Recurso: Servicios (`/api/services`)

- `GET /api/services` : Obtener todos los servicios (Acepta query params `?category=` y `?available=`).
- `GET /api/services/:sid` : Obtener un servicio por ID.
- `POST /api/services` : Crear un nuevo servicio.
- `PUT /api/services/:sid` : Actualizar un servicio existente.
- `DELETE /api/services/:sid` : Eliminar un servicio.

### Recurso: Reservas (`/api/bookings`)

- `POST /api/bookings` : Crear una nueva reserva (Valida internamente que los servicios indicados existan).
- `GET /api/bookings/:bid` : Obtener una reserva por ID.
- `POST /api/bookings/:bid/services/:sid` : Agrega un servicio existente a una reserva (Incrementa `quantity` si el servicio ya estaba presente).

---

_Desarrollado para el curso de Backend - Pre Entrega 4._
