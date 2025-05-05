const membershipService = require("../services/membershipService");

const membershipController = {

    updateMembership: async (req, res) => {
        try {
            const id = req.params.id
            const { price } = req.body;

            const updatedMembership = await membershipService.updateMembership(id, price);

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

}

module.exports = membershipController;