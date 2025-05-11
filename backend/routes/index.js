//tổng hợp các route
const express = require('express');
const router = express.Router();

// Import all route files
const productRoutes = require('./productRoutes');
const memberRoutes = require('./memberRoutes');
// Use routes
router.use('/products', productRoutes);
router.use('/members', memberRoutes);

router.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
  });
module.exports = router; 