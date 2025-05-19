const equimentService = require("../services/equimentService");

const equimentController = {
    createEquiment: async(req, res) => {
        try {
            const { gym_id, name, purchase_date, warranty_until, status } = req.body;

            const newEquiment = await equimentService.createEquiment({
                gym_id,
                name,
                purchase_date,
                warranty_until,
                status
            })

            res.status(201).json({
                success: true,
                data: newEquiment,
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Lỗi tạo Equiment"
            })
        }
    },

    updateEquiment: async(req, res) => {
        try {
            const id = req.params.id;

            const updateData = req.body;
            const updatedStaff = await equimentService.updateEquiment(id, updateData);

            res.json({
                success: true,
                message: 'Staff updated successfully',
                data: updatedStaff
            });
        } catch (error) {
            console.error('Error updating Staff:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi cập nhật Staff',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    },

    getAllEquiment: async (req, res) => {
        try {
            const EquimentList = await equimentService.getAllEquipment();
            res.status(201).json({
                success: true,
                data: EquimentList,
            })

        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Lỗi lấy Equiment"
            })
        }
    },

}

module.exports = equimentController;