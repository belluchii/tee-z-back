const Product = require("../models/Product");

const safeParse = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
};

exports.getAllProducts = async (
  page = 1,
  limit = 12,
  tags,
  color,
  priceMin,
  priceMax,
) => {
  try {
    const query = {};

    if (tags) {
      const parsedTags = safeParse(tags);
      if (parsedTags.length) {
        query.tags = { $in: parsedTags };
      }
    }

    if (color) {
      const parsedColors = safeParse(color);
      if (parsedColors.length) {
        query.color = { $in: parsedColors };
      }
    }

    if (priceMin || priceMax) {
      query.price = {
        ...(priceMin && { $gte: Number(priceMin) }),
        ...(priceMax && { $lte: Number(priceMax) }),
      };
    }

    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    return { products, total, page, totalPages: Math.ceil(total / limit) };
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};

exports.searchProducts = async (
  name,
  page = 1,
  limit = 12,
  tags,
  color,
  priceMin,
  priceMax,
) => {
  try {
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (tags) {
      const parsedTags = safeParse(tags);
      if (parsedTags.length) {
        query.tags = { $in: parsedTags };
      }
    }

    if (color) {
      const parsedColors = safeParse(color);
      if (parsedColors.length) {
        query.color = { $in: parsedColors };
      }
    }

    if (priceMin || priceMax) {
      query.price = {
        ...(priceMin && { $gte: Number(priceMin) }),
        ...(priceMax && { $lte: Number(priceMax) }),
      };
    }

    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    return { products, total, page, totalPages: Math.ceil(total / limit) };
  } catch (error) {
    throw new Error("Error al buscar productos");
  }
};
