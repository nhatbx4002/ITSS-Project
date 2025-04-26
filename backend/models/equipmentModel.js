const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  gym_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true },
  name: { type: String, required: true, maxlength: 100 },
  purchase_date: { type: Date },
  warranty_until: { type: Date },
  status: { type: String, enum: ['working', 'maintenance', 'broken'], default: 'working' }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
