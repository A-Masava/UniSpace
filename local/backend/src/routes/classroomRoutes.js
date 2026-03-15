/**
 * Classroom Routes
 */

const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.verifyToken, classroomController.createClass);
router.get('/my-classes', authMiddleware.verifyToken, classroomController.getMyClasses);
router.post('/join', authMiddleware.verifyToken, classroomController.joinClass);

module.exports = router;
