const productService = require("../services/productService");

// Controlador para obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const products = await productService.getAllProducts(limit, page);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener todos los productos con una tag
exports.getByTag = async (req, res) => {
  try {
    const { tag, limit, page } = req.params;
    const products = await productService.getByTag(tag, limit, page);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener todos los tags
exports.getTags = async (_req, res) => {
  try {
    const products = await productService.getTags();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para buscar productos

exports.searchProducts = async (req, res) => {
  try {
    const { name, page, limit } = req.params;
    const product = await productService.searchProducts(name, page, limit);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un producto

exports.getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getOneProduct(id);
    res.json(product);
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
      req.body,
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
