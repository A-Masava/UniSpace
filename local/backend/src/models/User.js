const mongoose = require('mongoose');

// ── STUDENT SCHEMA ──
const StudentSchema = new mongoose.Schema({
  fullName:   { type: String, required: true, trim: true },
  idNumber:   { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:   { type: String },
  department: { type: String, trim: true },
  googleId:   { type: String },
  avatar:     { type: String },
  createdAt:  { type: Date, default: Date.now }
});

// ── TEACHER SCHEMA ──
const TeacherSchema = new mongoose.Schema({
  fullName:  { type: String, required: true, trim: true },
  idNumber:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String },
  googleId:  { type: String },
  avatar:    { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', StudentSchema);
const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = { Student, Teacher };