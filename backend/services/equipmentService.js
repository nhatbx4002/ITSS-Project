const Equipment = require('../models/equipmentModel')

class EquipmentService{
     async getAllEquipment(name) {
  if (name) {
    // Tìm theo name, dùng regex để tìm tên chứa từ khóa, không phân biệt hoa thường
    return await Equipment.find({ name: { $regex: name, $options: 'i' } });
  }
  // Nếu không có name thì trả về tất cả
  return await Equipment.find();
}
          async createEquipment(data) {
     const { name, purchase_date, warranty_until, quantity } = data;
     if (!name || !purchase_date || !warranty_until || !quantity) {
     throw new Error('Please fill all fields');
     }
     const { working = 0, maintenance = 0, broken = 0 } = quantity;
     const total = working + maintenance + broken;

     if (total === 0) {
     throw new Error('Total equipment quantity must be greater than 0');
     }

     const newEquipment = new Equipment({
     name,
     purchase_date,
     warranty_until,
     quantity: {
          working,
          maintenance,
          broken
     }
     });

     await newEquipment.save();
     return newEquipment;
     }
     async updateEquipment(id, data) {
  const equipment = await Equipment.findById(id);

  if (!equipment) {
    throw new Error('Equipment not found');
  }

  // Nếu có cập nhật 'quantity.broken'
  if (data.quantity && typeof data.quantity.broken === 'number') {
    data.quantity = {
      working: equipment.quantity.working,
      maintenance: equipment.quantity.maintenance,
      broken: data.quantity.broken
    };
  }

  const updated = await Equipment.findByIdAndUpdate(id, data, { new: true });
  return updated;
}

   async deleteEquipment(id){
     return await Equipment.findByIdAndDelete(id);
   }


}

module.exports = new EquipmentService();