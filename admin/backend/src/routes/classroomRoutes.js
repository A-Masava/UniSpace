/**
 * Classroom Routes
 */

const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.get('/', adminAuthMiddleware.verifyToken, classController.getAllClassrooms);
router.get('/:id', adminAuthMiddleware.verifyToken, classController.getClassroomById);
router.delete('/:id', adminAuthMiddleware.verifyToken, classController.deleteClassroom);

module.exports = router;
