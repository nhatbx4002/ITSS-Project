const express = require('express');
const router = express.Router();

// Import all route files
const productRoutes = require('./productRoutes');

// Use routes
router.use('/products', productRoutes);

router.use('/staff',require('../routes/staff.routes'));
module.exports = router; 