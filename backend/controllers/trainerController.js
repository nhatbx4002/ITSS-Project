const User = require('../models/usersModel');
const Progress = require('../models/progressModel');
const TrainingPlan = require('../models/trainingPlanModel');
const Workout = require('../models/workoutModel');
const trainerService = require('../services/trainerService');
// Lấy danh sách hội viên của huấn luyện viên
exports.getTrainees = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const listTrainess = await trainerService.getTrainees(trainerId);
    res.status(200).json({
      success: true,
      message: 'Trainees list successfully.',
      data: listTrainess
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm tiến độ tập luyện cho hội viên
exports.addProgress = async (req, res) => {
  try {
    const trainerId = req.user._id;

    const data = {
      ...req.body,
      trainer_id: trainerId,
    }

    const progress = await trainerService.addProgress(data)
    res.status(201).json({
      success: true,
      message: 'Add progress successfully.',
      data: progress
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Lấy lịch sử tiến độ của hội viên
exports.getTraineeProgress = async (req, res) => {
  try {
    const { traineeId } = req.params;
    const progress = await Progress.find({ user_id: traineeId })
      .sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: 'List trainee progress successfully.',
      data: progress
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo kế hoạch tập luyện mới
exports.createTrainingPlan = async (req, res) => {
  try {
    const data = {
      ...req.body,
      trainer_id: req.user._id,
    }
   const trainingPlan = await trainerService.createTrainingPlan(data);
    res.status(201).json({
      success: true,
      message: 'Add training plan successfully.',
      data: trainingPlan
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Lấy kế hoạch tập luyện của hội viên
exports.getTraineeTrainingPlan = async (req, res) => {
  try {
    const { traineeId } = req.params;
    const trainingPlan = await TrainingPlan.findOne({ 
      user_id: traineeId,
      status: 'active'
    });
    res.json(trainingPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật kế hoạch tập luyện
exports.updateTrainingPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const updateData = req.body;
    const trainingPlan = await TrainingPlan.findByIdAndUpdate(
      planId,
      updateData,
      { new: true }
    );
    res.json(trainingPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy lịch sử tập luyện của hội viên
exports.getTraineeWorkoutHistory = async (req, res) => {
  try {
    const { traineeId } = req.params;
    const workouts = await Workout.find({ user_id: traineeId })
      .sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 