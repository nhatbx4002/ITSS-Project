const express = require('express');
const router = express.Router();

// Import all route files
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const feedbackRoutes = require('./feedbacksRoutes');
const membershipRoutes = require('./membershipRoutes');

// Use routes
router.use('/products', productRoutes);
router.use('/user', userRoutes);
router.use('/subscription', subscriptionRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/membership', membershipRoutes);

module.exports = router; 