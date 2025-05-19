const express = require('express');
const router = express.Router();

// Import all route files
const productRoutes = require('./productRoutes');

// Use routes
router.use('/products', productRoutes);

router.use('/auth', require('../routes/auth.routes'));
router.use('/staff',require('../routes/staff.routes'));
router.use('/trainer' ,require('../routes/trainerRoutes.js'));
module.exports = router; 