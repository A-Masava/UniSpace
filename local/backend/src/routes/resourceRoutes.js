/**
 * Resource Routes
 */

const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.verifyToken, resourceController.uploadResource);
router.get('/:classId', authMiddleware.verifyToken, resourceController.getClassResources);
router.delete('/:id', authMiddleware.verifyToken, resourceController.deleteResource);

module.exports = router;
