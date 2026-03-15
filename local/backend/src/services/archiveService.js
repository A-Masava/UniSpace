/**
 * Archive Service
 */

const Classroom = require('../models/Classroom');

exports.archiveClass = async (classId) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(
      classId,
      { archived: true },
      { new: true }
    );
    return classroom;
  } catch (error) {
    console.error('Error archiving class:', error);
    throw error;
  }
};

exports.getArchivedClasses = async (userId) => {
  try {
    const classes = await Classroom.find({
      $or: [
        { teacher: userId },
        { students: userId }
      ],
      archived: true
    });
    return classes;
  } catch (error) {
    console.error('Error fetching archived classes:', error);
    throw error;
  }
};
