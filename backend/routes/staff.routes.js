const express = require('express');
const router = express.Router();

const StaffControllers = require('../controllers/staffController');

router.get('/getAllMembers', StaffControllers.getAllMembers);
router
    .route('/:id')
    .get(StaffControllers.getMembersById)
    .delete(StaffControllers.deleteMemberById)
router.put('/feedback/:id/response',StaffControllers.respondToFeedback);
router.get('/workout/:id',StaffControllers.getWorkoutHistory);

router.put('/subscriptions/:id',StaffControllers.updateMemberSubscription);



module.exports = router;