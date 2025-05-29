const User = require("../models/usersModel");
const Feedback = require("../models/feedbackModel");
const Workout = require("../models/workoutModel");
const Subscription = require('../models/subscriptionModel');
const Membership = require('../models/membershipModel');


const validMemberships = [
    { type: 'personal_training', duration: 30, price: 42 },
    { type: 'personal_training', duration: 90, price: 113 },
    { type: 'personal_training', duration: 180, price: 208 },
    { type: 'personal_training', duration: 365, price: 375 },

    { type: 'standard', duration: 30, price: 25 },
    { type: 'standard', duration: 90, price: 63 },
    { type: 'standard', duration: 180, price: 113 },
    { type: 'standard', duration: 365, price: 208 },

    { type: 'vip', duration: 30, price: 84 },
    { type: 'vip', duration: 90, price: 229 },
    { type: 'vip', duration: 180, price: 417 },
    { type: 'vip', duration: 365, price: 750 },
];

class StaffService {
   async getAllMembers(searchTerm) {
  const matchStage = {
    role: 'member'
  };

  if (searchTerm) {
    matchStage.$or = [
      { full_name: { $regex: searchTerm, $options: 'i' } },  // i = ignore case
      { phone: { $regex: searchTerm, $options: 'i' } }
    ];
  }

  const members = await User.aggregate([
    { $match: matchStage },

    {
      $lookup: {
        from: 'subscriptions',
        localField: '_id',
        foreignField: 'user_id',
        as: 'subscription'
      }
    },

    {
      $unwind: {
        path: '$subscription',
        preserveNullAndEmptyArrays: true
      }
    },

    {
      $lookup: {
        from: 'memberships',
        localField: 'subscription.membership_id',
        foreignField: '_id',
        as: 'membership'
      }
    },

    {
      $unwind: {
        path: '$membership',
        preserveNullAndEmptyArrays: true
      }
    },

    {
      $project: {
        _id: 1,
        full_name: 1,
        phone: 1,
        birthdate: 1,
        'subscription.start_date': 1,
        'subscription.end_date': 1,
        'membership.duration': 1,
        'membership.name': 1,
        'membership.type' : 1,
        'membership.price' : 1
      }
    }
  ]);

  return members;
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
    


    async upsertMemberSubscription(user_id, updatePayload) {
    const user = await User.findById(user_id);
    if (!user) throw new Error('Người dùng không tồn tại');
    if (user.role !== 'member') throw new Error('Chỉ thành viên (member) mới được đăng ký hoặc cập nhật gói tập');

    const { type, duration, status = 'active', name } = updatePayload;

    if (!type || !duration) {
        throw new Error('Thiếu thông tin type và duration của gói tập');
    }

    // Tìm hoặc tạo membership tương ứng
    const parsedDuration = parseInt(duration);
    const membershipMatch = validMemberships.find(
        m => m.type === type && m.duration === parsedDuration
    );
    if (!membershipMatch) {
        throw new Error(`Không tìm thấy gói tập phù hợp với type: ${type} và duration: ${parsedDuration}`);
    }
    const finalPrice = membershipMatch.price;

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
    const finalMembershipId = membership._id;

    // Tính ngày bắt đầu và kết thúc
    const start_date = new Date();
    const end_date = new Date(start_date);
    end_date.setDate(start_date.getDate() + parsedDuration);

    // Tìm subscription đang active của user
    let existingSub = await Subscription.findOne({ user_id, status: 'active' });

    if (existingSub) {
        // Cập nhật subscription hiện có
        existingSub.membership_id = finalMembershipId;
        existingSub.start_date = start_date;
        existingSub.end_date = end_date;
        existingSub.status = status;
        await existingSub.save();
        user.membership_expiry_date = end_date;
        await user.save();
        return existingSub;
    } else {
        // Tạo mới subscription cho user
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
}


}

module.exports = new StaffService();