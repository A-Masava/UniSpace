/**
 * Resource Controller
 */

const Resource = require('../models/Resource');

exports.uploadResource = async (req, res) => {
  try {
    const { classId, title, description } = req.body;
    const fileName = req.file.filename;

    const resource = new Resource({
      classId,
      title,
      description,
      fileName,
      uploadedBy: req.user.id
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resource', error });
  }
};

exports.getClassResources = async (req, res) => {
  try {
    const resources = await Resource.find({ classId: req.params.classId });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
};
