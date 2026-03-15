/**
 * Database Schemas
 * MongoDB schema definitions for UniSpace application
 */

// User Schema
const UserSchema = {
  name: String,
  email: String,
  password: String,
  role: String, // 'admin', 'teacher', 'student'
  createdAt: Date,
  updatedAt: Date
};

// Classroom Schema
const ClassroomSchema = {
  name: String,
  description: String,
  subject: String,
  classCode: String,
  teacher: ObjectId,
  students: [ObjectId],
  createdAt: Date,
  archived: Boolean
};

// Resource Schema
const ResourceSchema = {
  classId: ObjectId,
  title: String,
  description: String,
  fileName: String,
  uploadedBy: ObjectId,
  createdAt: Date
};

// Message Schema
const MessageSchema = {
  conversationId: String,
  sender: ObjectId,
  message: String,
  createdAt: Date
};

// Routine Schema
const RoutineSchema = {
  classId: ObjectId,
  day: String,
  startTime: String,
  endTime: String,
  createdAt: Date
};

module.exports = {
  UserSchema,
  ClassroomSchema,
  ResourceSchema,
  MessageSchema,
  RoutineSchema
};
