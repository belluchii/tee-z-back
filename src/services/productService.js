const Product = require("../models/Product");

// Obtener todos los productos
exports.getAllProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};

// Obtener un producto
exports.getOneProducts = async (name) => {
  try {
    return await Product.findOne({ name });
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};

// Crear un nuevo producto
exports.createProduct = async (productData) => {
  try {
    return await Product.create(productData);
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};

// Actualizar un producto existente
exports.updateProduct = async (productId, newData) => {
  try {
    return await Product.findByIdAndUpdate(productId, newData, { new: true });
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
};

// Eliminar un producto existente
exports.deleteProduct = async (productId) => {
  try {
    return await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error("Error al eliminar el producto");
  }
};
