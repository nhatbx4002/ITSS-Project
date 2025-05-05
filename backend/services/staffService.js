const User = require("../models/usersModel");
const Feedback = require("../models/feedbackModel");
const Workout = require("../models/workoutModel");
const Subscription = require('../models/subscriptionModel');
const Membership = require('../models/membershipModel ');


const validMemberships = [
    { type: 'vip', duration: 30, price: 42 },
    { type: 'vip', duration: 90, price: 113 },
    { type: 'vip', duration: 180, price: 208 },
    { type: 'vip', duration: 365, price: 375 },

    { type: 'standard', duration: 30, price: 25 },
    { type: 'standard', duration: 90, price: 63 },
    { type: 'standard', duration: 180, price: 113 },
    { type: 'standard', duration: 365, price: 208 },

    { type: 'personal_training', duration: 30, price: 84 },
    { type: 'personal_training', duration: 90, price: 229 },
    { type: 'personal_training', duration: 180, price: 417 },
    { type: 'personal_training', duration: 365, price: 750 },
];

class StaffService {
    async getAllMembers(){
        return User.find({role : 'member'});    
    }
    async getMemberById(id){
         return await User.findById(id);
    }
    async deleteMember(id){
        return await User.findByIdAndDelete(id);
    }
    async respondToFeedBack(feedbackId, responseText){
        return await Feedback.findByIdAndUpdate(
            feedbackId,
            {
                response : responseText,
                response_at : new Date()
            },
            {new : true}
        );
    }
    async getWorkoutHistory(user_id, updatePayload){
        return await Workout.find(user_id);
    }
    async registerSubscriptionService(user_id, updatePayload) {
        const user = await User.findById(user_id);
        if (!user) throw new Error('Người dùng không tồn tại');
        if (user.role !== 'member') throw new Error('Chỉ thành viên (member) mới được đăng ký gói tập');
    
        const existingSub = await Subscription.findOne({ user_id, status: 'active' });
        if (existingSub) throw new Error('Người dùng đã có gói tập đang hoạt động');
    
        const { type, duration, status = 'active', name } = updatePayload;
    
        let finalMembershipId;
        let finalPrice;
    
        if (type && duration) {
            const parsedDuration = parseInt(duration);
    
            const membershipMatch = validMemberships.find(
                m => m.type === type && m.duration === parsedDuration
            );
    
            if (!membershipMatch) throw new Error(`Không tìm thấy gói tập phù hợp với type: ${type} và duration: ${parsedDuration}`);
    
            finalPrice = membershipMatch.price;
    
            let membership = await Membership.findOne({ type, duration: parsedDuration });
    
            if (!membership) {
                membership = await Membership.create({
                    type,
                    name: name || type,
                    duration: parsedDuration,
                    price: finalPrice
                });
            } else {
                if (name) membership.name = name;
                membership.price = finalPrice;
                await membership.save();
            }
    
            finalMembershipId = membership._id;
        } else {
            throw new Error('Thiếu thông tin type và duration của gói tập');
        }
    
        const start_date = new Date();
        const end_date = new Date(start_date);
        end_date.setDate(start_date.getDate() + parseInt(duration));
    
        const newSubscription = new Subscription({
            user_id,
            membership_id: finalMembershipId,
            start_date,
            end_date,
            status
        });
    
        await newSubscription.save();
    
        user.membership_expiry_date = end_date;
        await user.save();
    
        return newSubscription;
    }
    


    async updateMemberSubscription(subscriptionId, updatePayload) {
        console.log('subscriptionId:', subscriptionId);
        const { type, duration, status, name } = updatePayload;
    
        let finalMembershipId;
        let finalPrice;
    
        if (type && duration) {
            const parsedDuration = parseInt(duration);
            const membershipMatch = validMemberships.find(
                m => m.type === type && m.duration === parsedDuration
            );
    
            if (!membershipMatch) {
                throw new Error(`Không tồn tại gói tập với type: ${type} và duration: ${parsedDuration}`);
            }
    
            finalPrice = membershipMatch.price;
            let membership = await Membership.findOne({ type, duration: parsedDuration });
    
            if (!membership) {
                membership = await Membership.create({
                    type,
                    name: name || type,
                    duration: parsedDuration,
                    price: finalPrice
                });
            } else {
                if (name) membership.name = name;
                membership.price = finalPrice;
                await membership.save();
            }
    
            finalMembershipId = membership._id;
        }
    
        const start_date = new Date();
        const end_date = new Date(start_date);
    
        if (duration) {
            const parsedDuration = parseInt(duration);
            end_date.setDate(start_date.getDate() + parsedDuration);
        }
    
        const existingSub = await Subscription.findById(subscriptionId);
        console.log("Found subscription:", existingSub);
    
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            {
                ...(finalMembershipId && { membership_id: finalMembershipId }),
                start_date,
                end_date,
                ...(status && { status })
            },
            { new: true }
        );
    
        return updatedSubscription;
    }
    
    

    

}

module.exports = new StaffService();