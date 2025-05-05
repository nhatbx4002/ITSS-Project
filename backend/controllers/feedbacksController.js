const feedbacksService = require("../services/feedbacksService");

const feedbacksController = {

    createFeedback: async(req, res) => {
        try {
            const { user_id, gym_id, rating, comment } = req.body;

            const newFeedback = await feedbacksService.createFeedback({
                user_id,
                gym_id,
                rating,
                comment,
            })

            res.status(201).json({
                success: true,
                data: newFeedback,
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Lỗi tạo feedback"
            })
        }
    },

    getAllFeedback: async (req, res) => {
        try {
            const feedbackList = await feedbacksService.getAllFeedback();
            res.status(201).json({
                success: true,
                data: feedbackList,
            })

        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Lỗi lấy feedback"
            })
        }
    },

}

module.exports = feedbacksController;