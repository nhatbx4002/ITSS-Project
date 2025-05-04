const subscriptionService = require("../services/subscriptionService");
const mongoose = require('mongoose')

const subscriptionController = {
    createSubscription: async (req, res) => {
        try {
            const { user_id, membership_id, start_date, end_date, status } = req.body;

            const newSubscription = await subscriptionService.createSubscription({
                user_id, 
                membership_id, 
                start_date, 
                end_date, 
                status
            });

            res.status(201).json({
                success: true,
                data: newSubscription
            });

        } catch (error) {
            console.error("Lỗi tạo Subscription:", error.message);

            res.status(500).json({
                success: false,
                message: "Lỗi server"
            });
        }
    },

    getAllSubscriptions: async (req, res) => {
        try {
            const users = await subscriptionService.getAllSubscriptions();
            res.json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
            res.status(500).json({
                success: false,
                message: "Lỗi server khi lấy danh sách subscriptions"
            });
        }
    },
    

    getSubscriptionById: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Subscription ID format'
                });
            }

            const subscription = await subscriptionService.getSubscriptionById(id);
            res.json({
                success: true,
                data: subscription
            })
        }
        catch (error) {
            console.error('Error in getSubscriptionById:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while fetching Subscription',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },
    deleteSubscription: async(req, res) => {
        try {
            const id = req.params.id;
            const deletedSubscription = await subscriptionService.deleteSubscription(id);

            if (!deletedSubscription) {
                return res.status(404).json({
                    success: false,
                    message: 'Subscription not found'
                });
            }

            res.json({
                success: true,
                message: 'Subscription deleted successfully',
                data: deletedSubscription
            }); 

        } catch(error) {
            console.error('Error updating Subscription:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi cập nhật Subscription',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        }
    }
};

module.exports = subscriptionController;
