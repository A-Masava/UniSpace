/**
 * Announcement Controller
 */

const Announcement = require('../models/Announcement');
const Classroom    = require('../models/Classroom');

exports.createAnnouncement = async (req, res) => {
  try {
    const { text } = req.body;
    const classroomId = req.params.id;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Announcement text is required.' });
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    // Only class owner can post announcements
    if (classroom.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the teacher can post announcements.' });
    }

    const announcement = new Announcement({
      classroom: classroomId,
      text: text.trim()
    });

    await announcement.save();
    res.status(201).json(announcement);

  } catch (error) {
    res.status(500).json({ message: 'Error creating announcement.', error });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const classroomId = req.params.id;
    const announcements = await Announcement.find({ classroom: classroomId })
      .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements.', error });
  }
};
