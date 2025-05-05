const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  duration: { type: Number, required: true, enum : [30,90,180,365]}, //số thángtháng
  price: { type: mongoose.Types.Decimal128, required: true },
  type: { type: String, enum: ['standard', 'vip', 'personal_training'], required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Membership', MembershipSchema);


