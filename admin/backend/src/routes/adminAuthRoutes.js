/**
 * Admin Authentication Routes
 */

const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.post('/login', adminAuthController.login);
router.post('/logout', adminAuthMiddleware.verifyToken, adminAuthController.logout);

module.exports = router;
