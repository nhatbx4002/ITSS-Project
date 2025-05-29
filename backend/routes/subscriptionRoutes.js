const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Tạo user
router.post('/', subscriptionController.createSubscription);

// Lấy tất cả 
router.get('/', subscriptionController.getAllSubscriptions);

// Lấy theo ID
router.get('/:id', subscriptionController.getSubscriptionById);

router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;