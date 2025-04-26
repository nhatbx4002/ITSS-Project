const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products (with optional query filters)
router.get('/', productController.getAllProducts);

// Get product by id
router.get('/:id', productController.getProductById);

// Create new product
router.post('/', productController.createProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

// Update product stock
router.patch('/:id/stock', productController.updateStock);

module.exports = router; 