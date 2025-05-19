const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

router.get('/', membershipController.getAllMembership);
router.post('/',membershipController.createMembership);
router.delete('/:id',membershipController.deleteMembership);
router.put('/:id', membershipController.updateMembership);





module.exports = router;