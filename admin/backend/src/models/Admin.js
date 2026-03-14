/**
 * Admin Data Models
 * MongoDB schemas for admin data
 */

import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
});

export const Admin = mongoose.model('Admin', AdminSchema);
