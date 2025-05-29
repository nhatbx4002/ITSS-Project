const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  purchase_date: { type: Date },
  warranty_until: { type: Date },
  quantity: {
    working: { type: Number, default: 0 },
    maintenance: { type: Number, default: 0 },
    broken: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
