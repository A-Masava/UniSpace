/**
 * Classroom Routes
 */

const express             = require('express');
const router              = express.Router();
const classroomController = require('../controllers/classroomController');
const authMiddleware      = require('../middleware/authMiddleware');

const auth = authMiddleware.verifyToken;

// Create a new class (teacher only)
router.post('/', auth, classroomController.createClass);

// Get all classes for the logged-in user (teacher → owned classes, student → joined classes)
router.get('/my-classes', auth, classroomController.getMyClasses);

// Join a class using class code (student)
router.post('/join', auth, classroomController.joinClass);

// Get details of a specific class
router.get('/:id', auth, classroomController.getClassById);

// Get the student roster for a specific class (teacher only)
router.get('/:id/students', auth, classroomController.getClassStudents);

// Archive (soft-delete) a class (teacher only)
router.patch('/:id/archive', auth, classroomController.archiveClass);

module.exports = router;
