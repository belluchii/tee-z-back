const productService = require("../services/productService");

// Controlador para obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener todos los productos con una tag
exports.getByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const products = await productService.getByTag(tag);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un producto

exports.getOneProducts = async (req, res) => {
  try {
    const { name } = req.params;
    const products = await productService.getOneProducts(name);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un producto existente
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const updatedProduct = await productService.updateProduct(
      productId,
      req.body
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un producto existente
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await productService.deleteProduct(productId);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
