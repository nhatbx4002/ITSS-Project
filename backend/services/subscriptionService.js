const Subscription = require('../models/subscriptionModel');

const subscriptionService = {
    createSubscription: async ({ user_id, membership_id, start_date, end_date, status }) => {
        const newSubscription = new Subscription({
            user_id, 
            membership_id, 
            start_date, 
            end_date, 
            status
        });

        const savedSubscription = await newSubscription.save();
        return savedSubscription;
    },

    getAllSubscriptions: async () => {
        return await Subscription.find();
    },

    getSubscriptionById: async (id) => {
        return await Subscription.findById(id);
    },

    deleteSubscription: async (id) => {
        const deletedSubscription = await Subscription.findByIdAndDelete(id);
        return deletedSubscription;
    }
    
};

module.exports = subscriptionService;
