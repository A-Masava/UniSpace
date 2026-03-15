/**
 * Chat Routes
 */

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/messages', authMiddleware.verifyToken, chatController.sendMessage);
router.get('/messages/:conversationId', authMiddleware.verifyToken, chatController.getMessages);

module.exports = router;
