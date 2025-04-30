const express = require('express');
const router = express.Router();

// Import all route files
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');
const trainerRoutes = require('./trainerRoutes');
// Use routes
router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/trainer' , trainerRoutes);

module.exports = router; 