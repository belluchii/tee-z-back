# Tee-Z — Backend

API REST del ecommerce de remeras. Gestiona productos, usuarios, autenticación y búsqueda.

🔗 [Demo en vivo](https://tee-z.netlify.app/) · [Frontend](https://github.com/belluchii/tee-z-front)

## ¿Qué es?

Backend del ecommerce Tee-Z. Expone los endpoints para la gestión de productos, registro e inicio de sesión de usuarios, autenticación con JWT y búsqueda de productos.

## Funcionalidades

- **Productos** — Crear, actualizar, eliminar y buscar remeras
- **Usuarios** — Registro, inicio de sesión y gestión de cuentas
- **Autenticación** — JWT para proteger rutas privadas
- **Búsqueda** — Búsqueda de productos y usuarios

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de datos:** MongoDB (Mongoose)
- **Autenticación:** JWT

## Estructura del proyecto

```
├── src/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── App.js
├── test/
├── .gitignore
├── package.json
└── README.md
```

## Requisitos

- Node.js >= 18.x
- MongoDB

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/belluchii/tee-z-back.git
cd tee-z-back
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env`:

```env
MONGO_URL=mongodb://localhost:27017/tee-z
```

4. Iniciar el servidor:

```bash
npm start
```

La API estará disponible en `http://localhost:3001`.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor |
| `npm test` | Ejecuta los tests |

## Repositorios relacionados

- [tee-z-front](https://github.com/belluchii/tee-z-front) — Frontend con React.js
