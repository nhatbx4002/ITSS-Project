const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

router.get('/', membershipController.getAllMembership);
router.put('/:id', membershipController.updateMembership);




module.exports = router;