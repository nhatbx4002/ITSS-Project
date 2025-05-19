const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number },
  height: { type: Number },
  body_fat_percentage: { type: Number },
  muscle_mass: { type: Number },
  measurements: {
    chest: { type: Number },
    waist: { type: Number },
    hips: { type: Number },
    arms: { type: Number },
    thighs: { type: Number }
  },
  fitness_goals: { type: String },
  notes: { type: String },
  assessment: { type: String, enum: ['excellent', 'good', 'fair', 'needs_improvement'] }
});

module.exports = mongoose.model('Progress', ProgressSchema); 