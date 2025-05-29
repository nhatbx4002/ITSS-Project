const EquipmentService = require('../services/equipmentService');

class equipmentController{

    async getAllEquipment(req, res) {
  try {
    const { name } = req.query; // Lấy tham số name từ query string, vd: /equipments?name=may

    const getAllEquipments = await EquipmentService.getAllEquipment(name);

    res.status(200).json({
      success: true,
      message: "All Equipments Retrieved Successfully",
      data: getAllEquipments
    });
  } catch (error) {
    res.status(404).json({
      message: 'Error fetching equipment',
      error: error.message
    });
  }
}
    async createEquipment(req,res){
        try{
            const createEquipment = await EquipmentService.createEquipment(req.body);
            res.status(200).json({
                success : true,
                message : "Equipment Created Successfully",

            })
        }catch(error){
            res.status(404).json({
                message: 'Error creating equipment',
                error: error.message
            })
        }
    }
    async updateEquipment(req,res){
        try{
           const updateEquipment = await EquipmentService.updateEquipment(req.params.id,req.body);
           res.status(200).json({
            success : true,
            message : "Equipment Updated Successfully",
            data : updateEquipment
           })
        }catch(error){
            res.status(404).json({
                message: 'Error updating equipment',
                error: error.message
            })
        }
    }

    async deleteEquipment(req,res){
        try{
           const deleteEquipment = await EquipmentService.deleteEquipment(req.params.id);
           res.status(200).json({
            success : true,
            message : "Equipment Deleted Successfully",
            data : deleteEquipment
           })
        }catch(error){
            res.status(404).json({
                success : false,
                message: 'Error deleting equipment',
                error: error.message
            })
        }
    }

}

module.exports = new equipmentController();