const User = require("../models/usersModel");
const Feedback = require("../models/feedbackModel");
const Workout = require("../models/workoutModel");
const Subscription = require('../models/subscriptionModel');
const Membership = require('../models/membershipModel ');

function calculateDurationInDays(start_date, end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

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
    async getWorkoutHistory(id){
        return await Workout.find({user_id : id});
    }
    async registerSubsciptionService(user_id, membership_id, start_date){
        const user = await User.findById(user_id);
        if(!user)throw new error("User not found!");
        if(user.role !== 'member')throw new error("Only members can register for a subsciption");

        const membership = await Membership.findById(membership_id);
        if(!merbership)throw new error("Membership not found");

        const exstingSub = await Subscription.findOne({user_id, status : 'active'});
        if(exstingSub)throw new error("User already has an active subsciption");

        const startDate = new Date(start_date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + membership.duration);

        const newSub = newSubscription({
            user_id,
            membership_id,
            start_date : startDate,
            end_date : endDate,
            status : 'active',
        })

        await newSub.save();
        user.membership_expiry_date = endDate;
         
        return newSub;



    }

    async  updateMemberSubscription(subscriptionId, updatePayload) {
        const {type, membership_id, start_date, end_date,status, name, price } = updatePayload;
    
        let finalMembershipId = membership_id;
    
        
        if (!membership_id && type) {
            const membership = await Membership.findOne({ type });
            if (!membership) throw new Error(`Không tìm thấy membership với type: ${type}`);
            finalMembershipId = membership._id;
        }
    
        
        if (finalMembershipId && (name || price)) {
            const membershipToUpdate = await Membership.findById(finalMembershipId);
            if (!membershipToUpdate) throw new Error('Membership không tồn tại để cập nhật');
    
            if (name) membershipToUpdate.name = name;
            if (price) membershipToUpdate.price = price;
    
            await membershipToUpdate.save();
        }
    
        
        let duration = undefined;
        if (start_date && end_date) {
            duration = calculateDurationInDays(start_date, end_date);
    
            if (finalMembershipId) {
                await Membership.findByIdAndUpdate(finalMembershipId, { duration });
            }
        }
    
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            {
                ...(finalMembershipId && { membership_id: finalMembershipId }),
                ...(start_date && { start_date }),
                ...(end_date && { end_date }),
                ...(status && { status }),
            },
            { new: true }
        );
    
        return updatedSubscription;
    }

}

module.exports = new StaffService();