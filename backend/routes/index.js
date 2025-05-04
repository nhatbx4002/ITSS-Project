const express = require('express');
const router = express.Router();

// Import all route files
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');

// Use routes
router.use('/products', productRoutes);
router.use('/user', userRoutes);
router.use('/subscription', subscriptionRoutes);

module.exports = router; 