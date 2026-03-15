/**
 * Routine Controller
 */

const Routine = require('../models/Routine');

exports.createRoutine = async (req, res) => {
  try {
    const { classId, day, startTime, endTime } = req.body;

    const routine = new Routine({
      classId,
      day,
      startTime,
      endTime
    });

    await routine.save();
    res.status(201).json(routine);
  } catch (error) {
    res.status(500).json({ message: 'Error creating routine', error });
  }
};

exports.getClassRoutine = async (req, res) => {
  try {
    const routines = await Routine.find({ classId: req.params.classId });
    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching routine', error });
  }
};
