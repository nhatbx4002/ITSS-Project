const mongoose = require('mongoose');

const GymSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  address: { type: String, required: true },
  phone: { type: String, maxlength: 20 },
  status: { type: String, enum: ['active', 'maintenance', 'closed'], default: 'active' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gym', GymSchema);
