Backend Tee-z
Proyecto con fines de estudio conectado al portfolio de Valentin Berger.

Este es el backend del proyecto de ecommerce para la venta de remeras. El backend proporciona servicios para gestionar productos, usuarios, autenticación y busqueda.

Características

Productos: Gestión de productos, incluyendo la creación, actualización y eliminación de remeras.

Usuarios: Registro, inicio de sesión y gestión de cuentas de usuario.

Autenticación: JSON Web Tokens (JWT) para autenticación de usuarios.

Busqueda: Busqueda de usuarios y productos.

Tecnologías Utilizadas

Backend: Node.js, Express.js, MongoDB, Mongoose.

Autenticación: JSON Web Tokens (JWT).


Instalación
Sigue estos pasos para configurar y ejecutar el backend del proyecto en tu entorno local.

Prerrequisitos

Node.js (versión 18 o superior)

MongoDB (en ejecución localmente o una base de datos en la nube)


Clona el repositorio del backend en un directorio.

git clone https://github.com/belluchii/tee-z-back

cd tee-z-back


Instala las dependencias:

npm install

Configurar variables de entorno

Crea un archivo .env en el directorio backend con el siguiente contenido:

MONGO_URL= Tu-MONGO_URL

Inicia el servidor:

npm start


Uso

Los endpoints están disponibles en http://localhost:3001.

Se pueden utilizar herramientas como Postman o Insomnia para probar los endpoints.


Contribución

¡Contribuciones son bienvenidas! Por favor, sigue los siguientes pasos para contribuir:

Haz un fork del repositorio.

Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).

Realiza tus cambios.

Haz un commit de tus cambios (git commit -am 'Agrega nueva funcionalidad').

Haz un push a la rama (git push origin feature/nueva-funcionalidad).

Abre un Pull Request.

Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

