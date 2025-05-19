const User = require('../models/usersModel');
const Progress = require('../models/progressModel');
const TrainingPlan = require('../models/trainingPlanModel');
const Workout = require('../models/workoutModel');

const trainerService = {
    getTrainees: async ({trainerId}) => {

        // Tìm tất cả các kế hoạch tập luyện mà huấn luyện viên này phụ trách
        const trainingPlans = await TrainingPlan.find({ trainer_id: trainerId });

        // Lấy danh sách các user_id duy nhất từ các kế hoạch này
        const userIds = [...new Set(trainingPlans.map(plan => plan.user_id))];

        // Lấy thông tin chi tiết của các hội viên
        const trainees = await User.find({
            _id: { $in: userIds },
            role: 'member'
        }).select('full_name email phone birthdate membership_expiry_date');

        return trainees;
    },

    addProgress: async ({ user_id, weight, height, body_fat_percentage, muscle_mass, measurements, fitness_goals, notes, assessment , trainer_id }) => {

        const progress = new Progress({
            user_id,
            trainer_id: trainer_id,
            weight,
            height,
            body_fat_percentage,
            muscle_mass,
            measurements,
            fitness_goals,
            notes,
            assessment
        });
        await progress.save();

        return progress;
    },

    createTrainingPlan: async ({ user_id, name, description, start_date, end_date, frequency, exercises }) => {
        const trainingPlan = new TrainingPlan({
            user_id,
            trainer_id: trainer_id,
            name,
            description,
            start_date,
            end_date,
            frequency,
            exercises
        });
        await trainingPlan.save();

        return trainingPlan;
    }


}

module.exports = trainerService;