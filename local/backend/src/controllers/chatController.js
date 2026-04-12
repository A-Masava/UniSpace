/**
 * Chat Controller
 */

const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { classroomId, message } = req.body;
    
    // Determine the user's role string for polymorphism
    // We assume req.user.role is either 'teacher' or 'student' from authMiddleware
    const senderModel = req.user.role === 'teacher' ? 'Teacher' : 'Student';

    const newMessage = new Message({
      classroom: classroomId,
      sender: req.user.id,
      senderModel,
      message,
      createdAt: new Date()
    });

    await newMessage.save();
    
    // Populate sender details before returning
    const populatedMessage = await Message.findById(newMessage._id).populate('sender', 'fullName avatar');
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ classroom: req.params.classroomId })
      .populate('sender', 'fullName avatar')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};
