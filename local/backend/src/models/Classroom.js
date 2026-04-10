/**
 * Classroom Model
 * Stores all class data including enrolled students.
 * Named after the teacher (teacherName field) for easy identification.
 */

const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  // Class details
  course:      { type: String, required: true, trim: true },
  dept:        { type: String, required: true, trim: true },
  batch:       { type: String, required: true, trim: true },
  section:     { type: String, required: true, trim: true },
  idFrom:      { type: String, trim: true, default: '' },
  idTo:        { type: String, trim: true, default: '' },

  // Class code used by students to join
  classCode: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    trim: true
  },

  // Teacher reference + denormalized name for fast display
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  teacherName: { type: String, trim: true, default: '' },

  // Students who joined this class
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],

  // Soft-delete / archive
  archived: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Classroom', classroomSchema);
