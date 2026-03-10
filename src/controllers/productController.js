const productService = require("../services/productService");

exports.getAllProducts = async (req, res) => {
  try {
    const { page, limit, tags, color, priceMin, priceMax } = req.query;
    const products = await productService.getAllProducts(
      page,
      limit,
      tags,
      color,
      priceMin,
      priceMax,
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const { limit, page } = req.query;
    const products = await productService.getByTag(tag, limit, page);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTags = async (_req, res) => {
  try {
    const products = await productService.getTags();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { name, page, limit, tags, color, priceMin, priceMax } = req.query;
    const product = await productService.searchProducts(
      name,
      page,
      limit,
      tags,
      color,
      priceMin,
      priceMax,
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getOneProduct(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    await productService.deleteProduct(productId);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
