const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // có thể null
  date: { type: Date, default: Date.now },
  duration: { type: Number, required: true }, // phút
  notes: { type: String }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
