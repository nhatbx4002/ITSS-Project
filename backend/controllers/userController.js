const userService = require("../services/userService");
const mongoose = require('mongoose')

const userController = {
    createUser: async (req, res) => {
        try {
            const { full_name, email, password_hash, phone, birthdate, role, membership_expiry_date } = req.body;

            const newUser = await userService.createUser({
                full_name,
                email,
                password_hash,
                phone,
                birthdate,
                role,
                membership_expiry_date
            });

            res.status(201).json({
                success: true,
                data: newUser
            });

        } catch (error) {
            console.error("Lỗi tạo user:", error.message);

            res.status(500).json({
                success: false,
                message: "Lỗi server"
            });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({
                success: false,
                message: "Lỗi server khi lấy danh sách user"
            });
        }
    },
    // member
    getAllMember: async(req, res) => {
        try {
            const members = await userService.getAllMember('member');

        res.json({
            success: true,
            data: members
        });

        } catch(error) {
            console.error("Error fetching users:", error);
            res.status(500).json({
                success: false,
                message: "Lỗi server khi lấy danh sách member"
            });
        }
    },

    updateMember: async(req, res) => {
        try {
            const id = req.params.id;

            const updateData = req.body;
            const existingUser = await userService.getUserById(id);
            if (!existingUser || existingUser.role !== 'member') {
                return res.status(404).json({
                    success: false,
                    message: 'Member not found or not a valid member'
            });
        }
        const updatedMember = await userService.updateUser(id, updateData);

        res.json({
            success: true,
            message: 'Member updated successfully',
            data: updatedMember
        });
        } catch (error) {
            console.error('Error updating member:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi cập nhật member',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },
    getUserById: async (req, res) => {
        try {
            const id = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID format'
                });
            }

            const user = await userService.getUserById(id);
            res.json({
                success: true,
                data: user
            })
        }
        catch (error) {
            console.error('Error in getUserById:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while fetching user',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const id = req.params.id
            const updateData = req.body;

            const updatedUser = await userService.updateUser(id, updateData);

            res.json({
                success: true,
                data: updatedUser
            });
        } catch(error) {
            console.error('Error updating user:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi cập nhật user',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        }
    },

    deleteUser: async(req, res) => {
        try {
            const id = req.params.id;
            const deletedUser = await userService.deleteUser(id);

            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.json({
                success: true,
                message: 'User deleted successfully',
                data: deletedUser
            }); 

        } catch(error) {
            console.error('Error updating user:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi cập nhật user',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        }
    }
};

module.exports = userController;
