/**
 * Admin Backend Express App
 */

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const adminAuthRoutes = require('./routes/adminAuthRoutes');
const userRoutes = require('./routes/userRoutes');
const classroomRoutes = require('./routes/classroomRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/classrooms', classroomRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

module.exports = app;
