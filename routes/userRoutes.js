const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Ruta para obtener todos los usuarios
router.get("/", userController.getUsers);

// Ruta para obtener un usuario por su email
router.get("/:email", userController.getUser);

//ruta para validar un usuario
router.post("/validate", userController.validatePassword);

// Ruta para crear un nuevo usuario
router.post("/", userController.createUser);

// Ruta para actualizar un usuario por su ID
router.put("/:email", userController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
