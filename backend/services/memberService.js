const Workout = require ('../models/workoutModel');
const Feedback = require('../models/feedbackModel');
const Subscription = require('../models/subscriptionModel');
const Membership = require('../models/membershipModel');
const User = require('../models/usersModel');

const memberService = {
    //lay dl tu db tra ve danh sach buoi tap
    getUpcomingWorkouts: async (userId) => {
        const currentDate = new Date();
        console.log('Current Date:', currentDate);
    console.log('Current Date (ISO):', currentDate.toISOString());
        const workouts = await Workout.find({
            user_id: userId,
            date: { $gte: new Date() }
        }).populate('trainer_id', 'full_name');

         console.log('Workouts found:', workouts);
          return workouts;
    },
    getWorkoutHistory : async (userId) => {
        const currentDate = new Date();
        return await Workout.find({
            user_id : userId,
            date: {$lt: currentDate}
        }).populate('trainer_id', 'full_name');
    },
    createFeedback: async(feedbackData) => {
        const feedback = new Feedback(feedbackData);
        return await feedback.save();
    },
    createSubscription: async (subscriptionData) => {
       const{ user_id, membership_id, start_date } = subscriptionData;
        const membership = await Membership.findById(membership_id);
        if (!membership) {
            throw new Error('Membership not found');
        }
        const end_date = new Date(start_date);
        end_date.setMonth(end_date.getMonth() + membership.duration);
        const subscription = new Subscription({
            user_id,
            membership_id,
            start_date,
            end_date,
            status: 'active'
        });
        return await subscription.save();
    },
    getSubscriptions: async (userId) => {
        return await Subscription.find({ user_id: userId })
            .populate('membership_id', 'name price type duration')
            
    }
};
module.exports = memberService;