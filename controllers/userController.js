const userService = require("../services/userService");

// Controlador para obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al obtener los usuarios." });
  }
};

//controlador para validar un usuario
exports.validatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.validatePassword(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al validar la contraseña del usuario" });
  }
};

// Controlador para obtener un usuario por su email
exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al obtener el usuario." });
  }
};

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};

// Controlador para actualizar un usuario por su ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserById(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Hubo un error al actualizar el usuario." });
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUserById(req.params.id);
    res.status(200).json({ message: "Usuario eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al eliminar el usuario." });
  }
};
