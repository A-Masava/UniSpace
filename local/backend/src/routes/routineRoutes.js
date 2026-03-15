/**
 * Routine Routes
 */

const express = require('express');
const router = express.Router();
const routineController = require('../controllers/routineController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.verifyToken, routineController.createRoutine);
router.get('/:classId', authMiddleware.verifyToken, routineController.getClassRoutine);

module.exports = router;
