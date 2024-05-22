const mongoose = require("mongoose");

// Definir el esquema del producto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: [String], default: ["S", "M", "L", "XL", "XXL"] },
  color: { type: String, default: "black" },
  stock: {
    type: Number,
    default: 20,
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: (props) => `${props.value} debe ser mayor o igual que 0`,
    },
  },
  tags: { type: [String], default: [] },
  image: { type: String, required: true },
});

// Crear el modelo de producto basado en el esquema definido
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
