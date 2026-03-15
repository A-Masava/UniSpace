/**
 * Classroom Model
 */

const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: String,
  description: String,
  subject: String,
  classCode: {
    type: String,
    unique: true,
    default: () => Math.random().toString(36).substr(2, 9).toUpperCase()
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
