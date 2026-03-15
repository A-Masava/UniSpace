/**
 * Database Seed
 * Initial data for development and testing
 */

const initialUsers = [
  {
    name: 'Admin User',
    email: 'admin@unispace.com',
    password: 'hashedPassword123',
    role: 'admin'
  },
  {
    name: 'John Teacher',
    email: 'teacher@unispace.com',
    password: 'hashedPassword123',
    role: 'teacher'
  },
  {
    name: 'Jane Student',
    email: 'student@unispace.com',
    password: 'hashedPassword123',
    role: 'student'
  }
];

const initialClassrooms = [
  {
    name: 'Introduction to JavaScript',
    description: 'Learn the basics of JavaScript programming',
    subject: 'Computer Science',
    teacher: 'teacherId',
    students: []
  }
];

module.exports = {
  initialUsers,
  initialClassrooms
};
