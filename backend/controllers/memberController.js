const mongoose = require('mongoose');
const memberService = require('../services/memberService');

const memberController = {
    // Lấy các buổi tập sắp tới của người dùng
    getUpcomingWorkouts: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }

            const workouts = await memberService.getUpcomingWorkouts(userId);
            res.json({
                success: true,
                data: workouts
            });
        } catch (error) {
            console.error('Error in getUpcomingWorkouts:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while fetching upcoming workouts',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Lịch sử tập luyện của người dùng
    getWorkoutHistory: async (req, res) => {
        try {
            const userId = req.params.userId;
            const workouts = await memberService.getWorkoutHistory(userId);
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }

            
            res.json({
                success: true,
                data: workouts
            });
        } catch (error) {
            console.error('Error in getWorkoutHistory:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while fetching workout history',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Tạo feedback
    createFeedback: async (req, res) => {
        try {
            const userId = req.params.userId;
            const { gym_id, rating, comment } = req.body;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }

            if (!gym_id || !rating || rating < 1 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: 'Gym ID and a valid rating (1-5) are required'
                });
            }

            const feedback = await memberService.createFeedback({ user_id: userId, gym_id, rating, comment });
            res.status(201).json({
                success: true,
                data: feedback
            });
        } catch (error) {
            console.error('Error in createFeedback:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while creating feedback',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Tạo gói đăng ký
    createSubscription: async (req, res) => {
        try {
            const userId = req.params.userId;
            const { membership_id, start_date } = req.body;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }

            if (!membership_id || !start_date) {
                return res.status(400).json({
                    success: false,
                    message: 'Membership ID and start date are required'
                });
            }

            const subscription = await memberService.createSubscription({ user_id: userId, membership_id, start_date });
            res.status(201).json({
                success: true,
                data: subscription
            });
        } catch (error) {
            console.error('Error in createSubscription:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while creating subscription',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    // Lấy danh sách các gói tập hiện tại
    getSubscriptions: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }

            const subscriptions = await memberService.getSubscriptions(userId);
            res.json({
                success: true,
                data: subscriptions
            });
        } catch (error) {
            console.error('Error in getSubscriptions:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while fetching subscriptions',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

module.exports = memberController;
