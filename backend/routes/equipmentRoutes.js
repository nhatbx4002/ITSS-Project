const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equimentController');

router.post('/', equipmentController.createEquiment);
router.get('/', equipmentController.getAllEquiment);
router.put('/:id', equipmentController.updateEquiment);


module.exports = router;