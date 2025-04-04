const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

// Ruta para obtener un producto específico
router.get('/:id', productController.getProductById);

// Ruta para crear un producto
router.post('/', productController.createProduct);

// Ruta para actualizar un producto
router.put('/:id', productController.updateProduct);

// Ruta para eliminar un producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
