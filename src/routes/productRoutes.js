const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Ruta para obtener todos los productos
router.get("/", productController.getAllProducts);

// Ruta para obtener productos por tag
router.get("/tags/:tag", productController.getByTag);

// Ruta para obtener un producto

router.get("/:name", productController.getOneProducts);

// Ruta para crear un nuevo producto
router.post("/", productController.createProduct);

// Ruta para actualizar un producto existente
router.put("/:id", productController.updateProduct);

// Ruta para eliminar un producto existente
router.delete("/:id", productController.deleteProduct);

module.exports = router;
