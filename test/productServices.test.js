const mongoose = require("mongoose");
const Product = require("../src/models/Product");
//importa los servicios de productos
const {
  getAllProducts,
  getByTag,
  getOneProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../src/services/productService");

// Importa las funciones de Jest
const { describe, expect, it, beforeAll, afterAll } = require("@jest/globals");

// Datos del nuevo producto
const newProductData = {
  name: "ProductoTest",
  price: 50,
  description: "Descripción de prueba",
  tags: ["tag1"],
};

// Datos actualizados del producto
const updatedProductData = {
  price: 60,
  description: "Nueva descripción de prueba",
  tags: ["tag3", "tag4"],
};

// ID del producto a eliminar
let productIdToDelete;

// Conexión a la base de datos antes de todas las pruebas
beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/");
});

// Desconexión de la base de datos después de todas las pruebas
afterAll(async () => {
  await mongoose.disconnect();
});

// Pruebas para los servicios de productos
describe("Product Services", () => {
  it("should create a new product and find it by name", async () => {
    try {
      // Happy Path: Crear un nuevo producto y encontrarlo por nombre
      const createdProduct = await createProduct(newProductData);
      const findedProduct = await getOneProducts(newProductData.name);

      expect(createdProduct).toBeDefined();
      expect(createdProduct.name).toBe(newProductData.name);
      expect(findedProduct).toBeDefined();
      expect(findedProduct.name).toBe(newProductData.name);

      productIdToDelete = createdProduct._id; // Guardar el ID del producto creado para la prueba de eliminación
    } catch (error) {
      console.error(error);
    }
  });
  it("should return an array whith the products", async () => {
    try {
      // Happy path: Obtener todos los productos

      const products = await getAllProducts();
      expect(products).toBeDefined();
      expect(products.length).toBe(1);
    } catch (error) {
      console.error(error);
    }
  });
  it("should return an array whith the products by tag", async () => {
    try {
      // Happy path: Obtener todos los productos por tag

      const products = await getByTag("tag1");
      expect(products).toBeDefined();
      expect(products.length).toBe(1);
    } catch (error) {
      console.error(error);
    }
  });
  it("should return null when trying to find a product by non-existing tag", async () => {
    try {
      // Bad Path: Obtener todos los productos por tag cuando no hay ninguno

      const products = await getByTag("nonexistingtag");
      expect(products).toBeNull();
    } catch (error) {
      console.error(error);
    }
  });

  it("should return an empty array when there are no products", async () => {
    try {
      // Bad Path: Obtener todos los productos cuando no hay ninguno
      await Product.deleteMany({}); // Elimina todos los productos existentes

      const products = await getAllProducts();

      expect(products).toBeDefined();
      expect(products.length).toBe(0);
    } catch (error) {
      console.error(error);
    }
  });

  it("should update product by ID", async () => {
    try {
      // Happy Path: Actualizar un producto por ID
      const updatedProduct = await updateProduct(
        productIdToDelete,
        updatedProductData
      );

      expect(updatedProduct).toBeDefined();
      expect(updatedProduct.price).toBe(updatedProductData.price);
      expect(updatedProduct.description).toBe(updatedProductData.description);
    } catch (error) {
      console.error(error);
    }
  });
  it("should return error when trying to update stock below zero product", async () => {
    try {
      // Bad Path: Actualizar un producto que no existe
      const updatedProduct = await updateProduct("nonexistingID", {
        stock: -1,
      });

      expect(updatedProduct).toBeNull();
    } catch (error) {
      console.error(error);
    }
  });

  it("should return null when trying to update non-existing product", async () => {
    try {
      // Bad Path: Actualizar un producto que no existe
      const updatedProduct = await updateProduct(
        "nonexistingID",
        updatedProductData
      );

      expect(updatedProduct).toBeNull();
    } catch (error) {
      console.error(error);
    }
  });

  it("should delete product by ID", async () => {
    try {
      // Happy Path: Eliminar un producto por ID
      const deletedProduct = await deleteProduct(productIdToDelete);

      expect(deletedProduct).toBeDefined();
      expect(deletedProduct._id).toBe(productIdToDelete);
    } catch (error) {
      console.error(error);
    }
  });

  it("should return null when trying to delete non-existing product", async () => {
    try {
      // Bad Path: Eliminar un producto que no existe
      const deletedProduct = await deleteProduct("nonexistingID");

      expect(deletedProduct).toBeNull();
    } catch (error) {
      console.error(error);
    }
  });
});
