/**
 * Enrollment Service
 */

const Classroom = require('../models/Classroom');
const User = require('../models/User');

exports.enrollStudent = async (studentId, classId) => {
  try {
    const classroom = await Classroom.findById(classId);
    if (!classroom.students.includes(studentId)) {
      classroom.students.push(studentId);
      await classroom.save();
    }
    return classroom;
  } catch (error) {
    console.error('Error enrolling student:', error);
    throw error;
  }
};

exports.removeStudent = async (studentId, classId) => {
  try {
    const classroom = await Classroom.findById(classId);
    classroom.students = classroom.students.filter(id => id.toString() !== studentId);
    await classroom.save();
    return classroom;
  } catch (error) {
    console.error('Error removing student:', error);
    throw error;
  }
};
