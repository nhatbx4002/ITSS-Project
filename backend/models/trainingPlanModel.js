const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number },
  duration: { type: Number }, 
  notes: { type: String }
});

const TrainingPlanSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  frequency: { type: Number, required: true }, 
  exercises: [ExerciseSchema],
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrainingPlan', TrainingPlanSchema);