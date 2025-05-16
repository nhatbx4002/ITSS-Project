const membershipService = require("../services/membershipService");

const membershipController = {

    updateMembership: async (req, res) => {
        try {
            const id = req.params.id
            const { name, duration, price, type } = req.body;

            const updatedMembership = await membershipService.updateMembership(id, name, duration, price, type);

            res.json({
                success: true,
                data: updatedMembership
            });
        } catch(error) {
            console.error('Error updating membership:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi cập nhật membership',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        }
    },

    getAllMembership: async (req, res) => {
        try {
            const membershipList = await membershipService.getAllMembership();
            res.status(201).json({
                success: true,
                data: membershipList,
            })

        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Lỗi lấy membership"
            })
        }
    },

    createMembership: async (req, res) => {
        try {
            const { name, duration, price, type } = req.body;

            const newMembership = await membershipService.createMembership({
                name,
                duration,
                price,
                type,
            });

            res.status(201).json({
                success: true,
                data: newMembership
            });
        } catch(error) {
            console.error('Chi tiết lỗi khi tạo membership:', error);
            res.status(500).json({
                success: false,
                message: "Lỗi tạo membership"
            })
        }
    },

    deleteMembership: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedMembership = await membershipService.deleteMembership(id);

            if (!deletedMembership) {
                return res.status(404).json({
                    success: false,
                    message: 'Membership not found'
                });
            }

            res.json({
                success: true,
                message: 'Membership deleted successfully',
                data: deletedMembership
            });
        } catch(error) {
            console.error('Error updating Membership:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi cập nhật Membership',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        }
    }

}

module.exports = membershipController;