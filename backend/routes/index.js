const express = require('express');
const router = express.Router();

// Import all route files
const productRoutes = require('./productRoutes');

// Use routes
router.use('/products', productRoutes);

module.exports = router; 