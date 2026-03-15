/**
 * Analytics Service
 */

const User = require('../models/User');
const Classroom = require('../models/Classroom');

exports.getDashboardStats = async () => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClassrooms = await Classroom.countDocuments();
    const studentCount = await User.countDocuments({ role: 'student' });
    const teacherCount = await User.countDocuments({ role: 'teacher' });

    return {
      totalUsers,
      totalClassrooms,
      studentCount,
      teacherCount
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};

exports.getUserActivityReport = async () => {
  try {
    const stats = await this.getDashboardStats();
    return {
      ...stats,
      reportDate: new Date()
    };
  } catch (error) {
    console.error('Error getting activity report:', error);
    throw error;
  }
};
