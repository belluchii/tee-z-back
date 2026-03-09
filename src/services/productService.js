const Product = require("../models/Product");

// Obtener todos los productos
exports.getAllProducts = async (page = 1, limit = 12) => {
  try {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments(),
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};

// Obtener productos por tag
exports.getByTag = async (tag, page = 1, limit = 12) => {
  try {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find({ tags: { $in: [tag] } })
        .skip(skip)
        .limit(limit),
      Product.countDocuments({ tags: { $in: [tag] } }),
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    throw new Error("Error al obtener los productos por tag");
  }
};

// Obtener tags
exports.getTags = async () => {
  try {
    const tags = await Product.distinct("tags");
    return tags;
  } catch (error) {
    throw new Error("Error al obtener los tags");
  }
};

// Buscar productos
exports.searchProducts = async (name, page = 1, limit = 12) => {
  try {
    const query = name ? { name: { $regex: name, $options: "i" } } : {};

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    throw new Error("Error al buscar productos");
  }
};

// Obtener un producto
exports.getOneProduct = async (id) => {
  try {
    return await Product.findById(id);
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
