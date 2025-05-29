const Feedback = require('../models/feedbackModel');

const feedbacksService = {
    createFeedback: async ({ user_id, gym_id, rating, comment}) => {
        const newFeedback = new Feedback({
            user_id,
            gym_id,
            rating,
            comment,
        })

        const savedFeedback = await newFeedback.save();
        return savedFeedback
    },

    getAllFeedback: async () => {
        return await Feedback.find();                   
    },
}

module.exports = feedbacksService;