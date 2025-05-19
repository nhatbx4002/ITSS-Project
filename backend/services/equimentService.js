const Equipment = require('../models/equipmentModel');

const equimentService = {
    createEquipment: async ({ gym_id, name, purchase_date, warranty_until, status}) => {
        const newEquipment = new Equipment({
            gym_id,
            name,
            purchase_date, 
            warranty_until, 
            status,
        })

        const savedEquipment = await newEquipment.save();
        return savedEquipment
    },

    getAllEquipment: async () => {
        return await Equipment.find();                   
    },

    updateEquiment: async (id, updateData) => {
        const allowedFields = ['gym_id', 'name', 'purchase_date', 'warranty_until', 'status'];
                const filteredData = {};
            
                // Chỉ lấy các field hợp lệ, tránh ghi đè nhầm null
                for (const field of allowedFields) {
                    if (updateData[field] !== undefined) {
                        filteredData[field] = updateData[field];
                    }
                }
            
                const updatedEquipment = await User.findByIdAndUpdate(
                    id,
                    filteredData,
                    {
                        new: true,
                        runValidators: true
                    }
                );
            
                return updatedEquipment;
    }
}

module.exports = equimentService;