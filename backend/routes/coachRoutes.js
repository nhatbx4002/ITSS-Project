const express = require('express');
const router = express.Router();

const coachController = require('../controllers/coachController')
router.get('/', coachController.getAllCoaches);
router.post('/createCoach',coachController.createCoach);
router.delete('/deleteCoach/:id',coachController.deleteCoach)

module.exports = router;
