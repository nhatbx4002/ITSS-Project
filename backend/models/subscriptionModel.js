const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  membership_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership', required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
