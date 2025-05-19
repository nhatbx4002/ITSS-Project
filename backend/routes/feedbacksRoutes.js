const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbacksController');

router.post('/', feedbackController.createFeedback);
router.get('/', feedbackController.getAllFeedback);


module.exports = router;