/**
 * Classroom Controller
 * Handles CRUD for classrooms and student enrollment.
 */

const Classroom      = require('../models/Classroom');
const { Teacher, Student } = require('../models/User');

/* ── POST /api/classrooms
   Teacher creates a new class */
exports.createClass = async (req, res) => {
  try {
    const { course, dept, batch, section, idFrom, idTo, classCode } = req.body;

    if (!course || !dept || !batch || !section || !classCode) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Ensure class code is unique
    const existing = await Classroom.findOne({ classCode: classCode.trim().toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: 'Class code already in use. Choose a different one.' });
    }

    // Fetch teacher's name for denormalization
    const teacher = await Teacher.findById(req.user.id).select('fullName');
    const teacherName = teacher ? teacher.fullName : '';

    const classroom = new Classroom({
      course:      course.trim(),
      dept:        dept.trim(),
      batch:       batch.trim(),
      section:     section.trim(),
      idFrom:      idFrom  ? idFrom.trim()  : '',
      idTo:        idTo    ? idTo.trim()    : '',
      classCode:   classCode.trim().toUpperCase(),
      teacher:     req.user.id,
      teacherName
    });

    await classroom.save();
    res.status(201).json({ message: 'Class created successfully!', classroom });

  } catch (error) {
    console.error('createClass error:', error.message);
    res.status(500).json({ message: 'Error creating classroom.', error: error.message });
  }
};

/* ── GET /api/classrooms/my-classes
   Returns all active (non-archived) classes for the logged-in user.
   Teachers see classes they own; students see classes they joined. */
exports.getMyClasses = async (req, res) => {
  try {
    const role = req.user.role;
    let classrooms;

    if (role === 'teacher') {
      classrooms = await Classroom.find({ teacher: req.user.id, archived: false })
        .populate('students', 'fullName email idNumber department')
        .sort({ createdAt: -1 });
    } else {
      // student
      classrooms = await Classroom.find({ students: req.user.id, archived: false })
        .populate('teacher', 'fullName email designation department')
        .sort({ createdAt: -1 });
    }

    res.json(classrooms);

  } catch (error) {
    console.error('getMyClasses error:', error.message);
    res.status(500).json({ message: 'Error fetching classrooms.', error: error.message });
  }
};

/* ── POST /api/classrooms/join
   Student joins a class using the class code. */
exports.joinClass = async (req, res) => {
  try {
    const { classCode } = req.body;

    if (!classCode) {
      return res.status(400).json({ message: 'Please provide a class code.' });
    }

    const classroom = await Classroom.findOne({
      classCode: classCode.trim().toUpperCase(),
      archived: false
    });

    if (!classroom) {
      return res.status(404).json({ message: 'No active class found with that code. Check with your teacher.' });
    }

    // Prevent duplicate enrollment
    if (classroom.students.includes(req.user.id)) {
      return res.status(400).json({ message: 'You have already joined this class.' });
    }

    classroom.students.push(req.user.id);
    await classroom.save();

    // Return populated classroom for the frontend
    const populated = await Classroom.findById(classroom._id)
      .populate('teacher', 'fullName email designation department');

    res.json({ message: 'Successfully joined the class!', classroom: populated });

  } catch (error) {
    console.error('joinClass error:', error.message);
    res.status(500).json({ message: 'Error joining classroom.', error: error.message });
  }
};

/* ── GET /api/classrooms/:id/students
   Teacher views the full student roster for a specific class. */
exports.getClassStudents = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id)
      .populate('teacher', 'fullName')
      .populate('students', 'fullName email idNumber department createdAt');

    if (!classroom) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    // Only the class owner can see the roster
    if (classroom.teacher._id.toString() !== req.user.id && req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    res.json({
      classroom: {
        _id:         classroom._id,
        course:      classroom.course,
        dept:        classroom.dept,
        batch:       classroom.batch,
        section:     classroom.section,
        classCode:   classroom.classCode,
        teacherName: classroom.teacherName,
        createdAt:   classroom.createdAt
      },
      students: classroom.students,
      count:    classroom.students.length
    });

  } catch (error) {
    console.error('getClassStudents error:', error.message);
    res.status(500).json({ message: 'Error fetching students.', error: error.message });
  }
};

/* ── PATCH /api/classrooms/:id/archive
   Teacher archives (soft-deletes) a class. */
exports.archiveClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);

    if (!classroom) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    if (classroom.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the class owner can archive this class.' });
    }

    classroom.archived = true;
    await classroom.save();

    res.json({ message: 'Class archived successfully.' });

  } catch (error) {
    console.error('archiveClass error:', error.message);
    res.status(500).json({ message: 'Error archiving class.', error: error.message });
  }
};

/* ── GET /api/classrooms/:id
   Get details of a specific class. */
exports.getClassById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id)
      .populate('teacher', 'fullName email designation department')
      .populate('students', 'fullName email idNumber department');

    if (!classroom) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    res.json(classroom);

  } catch (error) {
    console.error('getClassById error:', error.message);
    res.status(500).json({ message: 'Error fetching class.', error: error.message });
  }
};
