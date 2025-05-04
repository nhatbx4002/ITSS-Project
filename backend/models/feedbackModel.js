const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gym_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  response: { type: String }, 
  response_at: { type: Date },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
