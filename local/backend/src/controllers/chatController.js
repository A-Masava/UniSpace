/**
 * Chat Controller
 */

const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, message } = req.body;

    const newMessage = new Message({
      conversationId,
      sender: req.user.id,
      message,
      createdAt: new Date()
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId }).populate('sender');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};
