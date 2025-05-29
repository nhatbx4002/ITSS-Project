
const Membership = require("../models/membershipModel");
const Subscription = require("../models/subscriptionModel");
const membershipService = {
    createMembership: async({ name, duration, price, type }) => {
        const newMembership = new Membership({
            name,
            duration, 
            price,
            type
        })

        const savedMembership = await newMembership.save();
        return savedMembership;
    },
    
    getAllMembership : async () => {
  const memberships = await Membership.find();

  const results = await Promise.all(
    memberships.map(async (membership) => {
      const count = await Subscription.countDocuments({
        membership_id: membership._id,
        status: 'active' // hoặc bỏ nếu muốn đếm tất cả
      });

      return {
        type: membership.type,
        duration: membership.duration,
        price: parseFloat(membership.price.toString()),
        registeredCount: count 
      };
    })
  );

  return results;
},

    updateMembership: async (id, name, duration, price, type) => {
    
        const updatedMembership = await Membership.findByIdAndUpdate(
            id,
            { name, duration, price, type },
            { new: true }
        );
    
        return updatedMembership;
    },

    deleteMembership: async (id) => {
        const deletedMembership = await Membership.findByIdAndDelete(id);
        return deletedMembership;
    }
};

module.exports = membershipService;