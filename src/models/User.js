const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [String],
    default: [],
  },
  history: {
    type: [String],
    default: [],
  },
  favs: {
    type: [String],
    default: [],
  },
});

userSchema.pre("save", function (next) {
  try {
    if (this.isNew || this.isModified("password")) {
      // Aplicar hashing solo si se está creando un nuevo usuario o se está modificando la contraseña
      // Generar un salt y hashear la contraseña de manera sincrónica
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(this.password, salt);

      // Reemplazar la contraseña sin hashear con la contraseña hasheada
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Crear el modelo de usuario basado en el esquema definido
const User = mongoose.model("User", userSchema);

module.exports = User;
