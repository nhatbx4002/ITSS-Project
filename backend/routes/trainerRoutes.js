const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const {authMiddleware , trainerMiddleware} = require('../middleware/authMiddleware');

// Áp dụng middleware xác thực cho tất cả các routes
router.use(authMiddleware);
router.use(trainerMiddleware);
// Routes cho quản lý danh sách hội viên
router.get('/trainees', trainerController.getTrainees);

// Routes cho theo dõi tiến độ
router.post('/progress', trainerController.addProgress);
router.get('/trainees/:traineeId/progress', trainerController.getTraineeProgress);

// Routes cho kế hoạch tập luyện
router.post('/training-plans', trainerController.createTrainingPlan);
router.get('/trainees/:traineeId/training-plan', trainerController.getTraineeTrainingPlan);
router.put('/training-plans/:planId', trainerController.updateTrainingPlan);

// Routes cho lịch sử tập luyện
router.get('/trainees/:traineeId/workouts', trainerController.getTraineeWorkoutHistory);

module.exports = router; 