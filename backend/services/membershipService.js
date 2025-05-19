
const Membership = require("../models/membershipModel");

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
    
    getAllMembership: async () => {
        return await Membership.find();
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
