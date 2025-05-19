const User = require('../models/usersModel');

const userService = {
    createUser: async ({ full_name, email, password_hash, phone, birthdate, role, membership_expiry_date }) => {
        const newUser = new User({
            full_name, 
            email, 
            password_hash, 
            phone, 
            birthdate, 
            role, 
            membership_expiry_date
        });

        const savedUser = await newUser.save();
        return savedUser;
    },

    getAllUsers: async () => {
        return await User.find();
    },

    getAllMember: async (role) => {
        return await User.find({ role });
    },



    getUserById: async (id) => {
        return await User.findById(id);
    },

    updateUser: async (id, updateData) => {
        const allowedFields = ['full_name', 'email', 'phone', 'birthdate', 'membership_expiry_date'];
        const filteredData = {};
    
        // Chỉ lấy các field hợp lệ, tránh ghi đè nhầm null
        for (const field of allowedFields) {
            if (updateData[field] !== undefined) {
                filteredData[field] = updateData[field];
            }
        }
    
        const updatedUser = await User.findByIdAndUpdate(
            id,
            filteredData,
            {
                new: true,
                runValidators: true
            }
        );
    
        return updatedUser;
    },

    deleteUser: async (id) => {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    }
    
};

module.exports = userService;
