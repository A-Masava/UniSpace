/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.get('/', adminAuthMiddleware.verifyToken, userController.getAllUsers);
router.get('/:id', adminAuthMiddleware.verifyToken, userController.getUserById);
router.put('/:id', adminAuthMiddleware.verifyToken, userController.updateUser);
router.post('/:id/deactivate', adminAuthMiddleware.verifyToken, userController.deactivateUser);

module.exports = router;
