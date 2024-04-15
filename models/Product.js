const mongoose = require("mongoose");

// Definir el esquema del producto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: [String], default: ["S", "M", "X", "XL", "XXL"] },
  color: { type: String, default: "black" },
  stock: { type: Number, default: 20 },
  tags: { type: [String], default: [] },
  image: { type: String, required: true }, // Aquí podrías almacenar la URL de la imagen
});

// Crear el modelo de producto basado en el esquema definido
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
