/**
 * Announcement Routes
 */

const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:id/announcements', authMiddleware.verifyToken, announcementController.createAnnouncement);
router.get('/:id/announcements', authMiddleware.verifyToken, announcementController.getAnnouncements);

module.exports = router;
