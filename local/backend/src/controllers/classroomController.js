/**
 * Classroom Controller
 */

const Classroom = require('../models/Classroom');
const User = require('../models/User');

exports.createClass = async (req, res) => {
  try {
    const { name, description, subject } = req.body;
    const classroom = new Classroom({
      name,
      description,
      subject,
      teacher: req.user.id
    });

    await classroom.save();
    res.status(201).json(classroom);
  } catch (error) {
    res.status(500).json({ message: 'Error creating classroom', error });
  }
};

exports.getMyClasses = async (req, res) => {
  try {
    const role = req.user.role;
    let classrooms;

    if (role === 'teacher') {
      classrooms = await Classroom.find({ teacher: req.user.id }).populate('students');
    } else {
      classrooms = await Classroom.find({ students: req.user.id }).populate('teacher');
    }

    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classrooms', error });
  }
};

exports.joinClass = async (req, res) => {
  try {
    const { classCode } = req.body;
    const classroom = await Classroom.findOne({ classCode });

    if (!classroom) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (classroom.students.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already enrolled in this class' });
    }

    classroom.students.push(req.user.id);
    await classroom.save();

    res.json({ message: 'Joined class successfully', classroom });
  } catch (error) {
    res.status(500).json({ message: 'Error joining class', error });
  }
};
