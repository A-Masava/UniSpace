/**
 * API Routes
 * Main endpoint definitions
 */

import express from 'express';
import { authController, classroomController } from '../controllers/authController.js';

const router = express.Router();

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/signup', authController.signup);
router.post('/auth/logout', authController.logout);

// Classroom routes
router.post('/classrooms', classroomController.create);
router.get('/classrooms', classroomController.getAll);
router.get('/classrooms/:id', classroomController.getById);

export default router;
