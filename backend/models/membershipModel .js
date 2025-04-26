const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  duration: { type: Number, required: true }, // số ngày
  price: { type: mongoose.Types.Decimal128, required: true },
  type: { type: String, enum: ['standard', 'vip', 'personal_training'], required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Membership', MembershipSchema);
