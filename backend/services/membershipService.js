const Membership = require("../models/membershipModel");

const membershipService = {
    
    getAllMembership: async () => {
        return await Membership.find();
    },

    updateMembership: async (id, price) => {
    
        const updatedMembership = await Membership.findByIdAndUpdate(
            id,
            { price: price },
        );
    
        return updatedMembership;
    },
};

module.exports = membershipService;
