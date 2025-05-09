const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  password_hash: { type: String, required: true, maxlength: 255 },
  phone: { type: String, maxlength: 20 },
  birthdate: { type: Date },
  role: { type: String, enum: ['admin', 'staff', 'trainer', 'member'], required: true },
  membership_expiry_date: { type: Date },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
