const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
router.get('/',equipmentController.getAllEquipment);
router.post('/createEquipment', equipmentController.createEquipment);
router.put('/updateEquipment/:id',equipmentController.updateEquipment);
router.delete('/deleteEquipment/:id',equipmentController.deleteEquipment)
module.exports = router;