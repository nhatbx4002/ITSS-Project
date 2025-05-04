const express = require('express');
const router = express.Router();

// Import all route files
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

// Use routes
router.use('/products', productRoutes);
router.use('/user', userRoutes);

module.exports = router; 