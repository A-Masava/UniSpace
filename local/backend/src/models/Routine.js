/**
 * Routine Model
 */

const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  day: String,
  startTime: String,
  endTime: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Routine', routineSchema);
