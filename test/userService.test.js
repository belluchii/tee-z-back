const mongoose = require("mongoose");
const User = require("../src/models/User");
const {
  createUser,
  getUserByEmail,
  validatePassword,
  getUsers,
  updateUserByEmail,
  deleteUserById,
} = require("../src/services/userService");

// Importa las funciones de Jest
const { describe, expect, it, beforeAll, afterAll } = require("@jest/globals");

// Datos del nuevo usuario
const newUserData = {
  email: "1234@test.com",
  password: "Hola1234",
  name: "Jose",
  last_name: "Moya",
};

// Datos actualizados del usuario
const updatedUserData = {
  password: "nuevacontraseña",
};

// ID del usuario a eliminar
let userIdToDelete;

// Conexión a la base de datos antes de todas las pruebas
beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/");
});

// Desconexión de la base de datos después de todas las pruebas
afterAll(async () => {
  await mongoose.disconnect();
});

// Pruebas para los servicios de usuario
describe("User Services", () => {
  it("should create a new user and find it by email", async () => {
    try {
      // Happy Path: Crear un nuevo usuario y encontrarlo por email
      const createdUser = await createUser(newUserData);
      const findedUser = await getUserByEmail(newUserData.email);

      expect(createdUser).toBeDefined();
      expect(createdUser.email).toBe(newUserData.email);
      expect(findedUser).toBeDefined();
      expect(findedUser.email).toBe(newUserData.email);

      userIdToDelete = createdUser._id; // Guardar el ID del usuario creado para la prueba de eliminación
    } catch (error) {
      console.error(error);
    }
  });

  it("should throw an error when trying to validate incorrect password", async () => {
    try {
      // Happy Path: Validar una contraseña incorrecta
      await validatePassword(newUserData.email, "ContraseñaIncorrecta");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe(
        "Error al validar la contraseña del usuario: Contraseña incorrecta"
      );
    }
  });

  it("should return an empty array when there are no users", async () => {
    try {
      // Bad Path: Obtener todos los usuarios cuando no hay ninguno
      await User.deleteMany({}); // Elimina todos los usuarios existentes

      const users = await getUsers();

      expect(users).toBeDefined();
      expect(users.length).toBe(0);
    } catch (error) {
      console.error(error);
    }
  });

  it("should update user by email", async () => {
    try {
      // Happy Path: Actualizar un usuario por email
      const createdUser = await createUser(newUserData);
      const updatedUser = await updateUserByEmail(
        createdUser.email,
        updatedUserData
      );

      expect(updatedUser).toBeDefined();
      expect(updatedUser.password).toBe(updatedUserData.password);
    } catch (error) {
      console.error(error);
    }
  });

  it("should return null when trying to update non-existing user", async () => {
    try {
      // Bad Path: Actualizar un usuario que no existe
      const updatedUser = await updateUserByEmail(
        "nonexisting@test.com",
        updatedUserData
      );

      expect(updatedUser).toBeNull();
    } catch (error) {
      console.error(error);
    }
  });

  it("should delete user by id", async () => {
    try {
      // Happy Path: Eliminar un usuario por ID
      const createdUser = await createUser(newUserData);
      const deletedUser = await deleteUserById(createdUser._id);

      expect(deletedUser).toBeDefined();
      expect(deletedUser._id).toBe(createdUser._id);
    } catch (error) {
      console.error(error);
    }
  });

  it("should return null when trying to delete non-existing user", async () => {
    try {
      // Bad Path: Eliminar un usuario que no existe
      const deletedUser = await deleteUserById("nonexistingID");

      expect(deletedUser).toBeNull();
    } catch (error) {
      console.error(error);
    }
  });
});
