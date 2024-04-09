const bcrypt = require("bcrypt");
const User = require("../models/User");

// Función para validar la contraseña de un usuario
exports.validatePassword = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    return { message: "Contraseña válida" };
  } catch (error) {
    throw new Error(
      "Error al validar la contraseña del usuario: " + error.message
    );
  }
};

// Función para obtener todos los usuarios
exports.getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Error al obtener los usuarios");
  }
};

// Función para obtener un usuario por su email
exports.getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error("Error al obtener el usuario por ID");
  }
};

// Función para crear un nuevo usuario
exports.createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    throw new Error(`Error al crear el usuario ${error}`);
  }
};

// Función para actualizar un usuario por su ID
exports.updateUserById = async (userId, userData) => {
  try {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  } catch (error) {
    throw new Error("Error al actualizar el usuario por ID");
  }
};

// Función para eliminar un usuario por su ID
exports.deleteUserById = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error("Error al eliminar el usuario por ID");
  }
};
