const express = require('express');
const router = express.Router();

const StaffControllers = require('../controllers/staffController');

router.get('/getAllMembers', StaffControllers.getAllMembers);
router
    .route(':/id')
    .get(StaffControllers.getMembersById)



module.exports = router;