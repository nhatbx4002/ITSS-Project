const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
//theo dõi lịch tập
router.get('/:userId/workouts/upcoming',memberController.getUpcomingWorkouts);

// Xem lịch sử tập luyện
router.get('/:userId/workouts/history', memberController.getWorkoutHistory);

// Đánh giá dịch vụ
router.post('/:userId/feedback', memberController.createFeedback);

// Chọn gói tập
router.post('/:userId/subscriptions', memberController.createSubscription);

// Xem danh sách gói tập
router.get('/:userId/subscriptions', memberController.getSubscriptions);

module.exports = router;