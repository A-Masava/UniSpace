# UniSpace Architecture

## Overview
UniSpace is a comprehensive educational platform built with a monorepo structure, supporting both admin and local (student/teacher) systems.

## System Architecture

### Components

#### Admin System
- **Frontend**: Admin dashboard for managing users, classrooms, and reports
- **Backend**: API for admin operations and analytics

#### Local System
- **Frontend**: Student and teacher interfaces for classroom management
- **Backend**: Core API for classrooms, resources, chat, and routines

#### Shared
- Constants, roles, and validation utilities shared across services

#### Database
- Schema definitions, seed data, and migrations

## Tech Stack
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Real-time**: Socket.io for chat functionality
- **Authentication**: JWT tokens

## Key Features
1. User authentication (students, teachers, admins)
2. Classroom management and enrollment
3. Resource sharing
4. Real-time messaging
5. Class routines and schedules
6. Admin analytics and reporting
7. Class archival system
