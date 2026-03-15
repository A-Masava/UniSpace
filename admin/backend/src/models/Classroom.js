/**
 * Classroom Model
 */

const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: String,
  description: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Classroom', classroomSchema);
