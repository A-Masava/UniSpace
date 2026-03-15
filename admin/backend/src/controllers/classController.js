/**
 * Class Controller
 */

const Classroom = require('../models/Classroom');

exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('teacher');
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classrooms', error });
  }
};

exports.getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id).populate('teacher').populate('students');
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classroom', error });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    await Classroom.findByIdAndDelete(req.params.id);
    res.json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting classroom', error });
  }
};
