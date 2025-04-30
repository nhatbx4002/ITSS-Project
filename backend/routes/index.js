const express = require('express');
const router = express.Router();

// Import all route files
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');

// Use routes
router.use('/products', productRoutes);
router.use('/auth', authRoutes);

module.exports = router; 