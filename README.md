# UniSpace - Educational Platform

A comprehensive educational platform for managing classrooms, students, and teachers with real-time communication features.

## Project Overview

UniSpace is a full-stack web application built with modern technologies, featuring:
- Student and Teacher authentication
- Classroom management
- Real-time chat system
- Resource upload/download
- Semester management
- Admin dashboard

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla/Vanilla JS)
- **Backend**: Node.js v24.0.0
- **Database**: MongoDB v8.2 LTS
- **Real-Time Communication**: Socket.IO v4.8.3 LTS

## Project Structure

```
demo-unispace/
├── admin/                          # Admin Portal Application
│   ├── frontend/                   # Admin UI
│   │   ├── public/
│   │   │   ├── pages/              # Admin pages
│   │   │   └── assets/             # Styles, images
│   │   ├── src/                    # JavaScript modules
│   │   └── package.json
│   └── backend/                    # Admin API
│       ├── src/
│       │   ├── config/
│       │   ├── controllers/
│       │   ├── models/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── middleware/
│       │   └── utils/
│       ├── uploads/
│       └── package.json
│
├── local/                          # Student/Teacher Application
│   ├── frontend/                   # Main UI
│   │   ├── public/
│   │   │   ├── pages/              # Student/Teacher pages
│   │   │   └── assets/             # Styles, images
│   │   ├── src/                    # JavaScript modules
│   │   └── package.json
│   └── backend/                    # Main API
│       ├── src/
│       │   ├── config/
│       │   ├── controllers/
│       │   ├── models/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── middleware/
│       │   └── utils/
│       ├── uploads/
│       └── package.json
│
├── packages/shared/                # Shared utilities & constants
├── database/                       # Database schemas & migrations
├── docs/                           # Documentation
├── scripts/                        # Automation scripts
└── .github/                        # CI/CD workflows
```

## Quick Start

### Prerequisites
- Node.js v24.0.0 or higher
- MongoDB v8.2 LTS
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd "Demo UniSpace"
   ```

2. **Install dependencies for all workspaces**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration

4. **Initialize Database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start Development Servers**
   ```bash
   npm run dev
   ```
   - Frontend will run on `http://localhost:3000`
   - Backend will run on `http://localhost:5000`

## Available Scripts

### Root Level Commands

```bash
# Development - Run student/teacher application (local)
npm run dev

# Development - Run both admin and local applications
npm run dev:all

# Build all applications
npm run build

# Start production
npm start

# Student/Teacher Application (Local)
npm run local:server          # Backend API
npm run local:client          # Frontend UI

# Admin Application
npm run admin:server          # Backend API
npm run admin:client          # Frontend UI

# Database operations
npm run db:migrate            # Run migrations
npm run db:seed               # Seed initial data

# Code quality
npm run lint
npm test
```

## Workspace Structure

### Admin Application
- **Frontend** (`admin/frontend/`) - Admin dashboard UI
  - HTML5 pages for system management
  - CSS3 stylesheets  
  - Vanilla JavaScript modules
  - Port: 3001

- **Backend** (`admin/backend/`) - Admin API
  - Express.js REST API
  - Admin controllers and routes
  - User/system management services
  - Port: 5001

### Local Application (Student/Teacher)
- **Frontend** (`local/frontend/`) - Main application UI
  - HTML5 pages for students and teachers
  - CSS3 stylesheets with layouts
  - Vanilla JavaScript modules
  - Real-time socket connections
  - Port: 3000

- **Backend** (`local/backend/`) - Main API
  - Express.js REST API
  - Classroom management
  - Student/Teacher controllers
  - Real-time Socket.IO handlers
  - MongoDB integration
  - Port: 5000

### Shared Package (`packages/shared/`)
Common utilities including:
- Shared constants
- Helper functions
- Validation schemas
- Common types/interfaces

### Database (`database/`)
- Schemas: MongoDB document designs
- Migrations: Database versioning
- Seeds: Initial sample data

## Features

### Must Have (MVP)
- ✅ Student and Teacher authentication
- ✅ Classroom creation with defined ID range
- ✅ Automatic enrollment within valid ID range
- ✅ Teacher approval system for invalid IDs
- ✅ Resource upload and download
- ✅ Real-time chat system
- ✅ Semester completion and archival
- ✅ Multifunctional interface
- ✅ Password hashing

### Should Have
- ✅ Notification system for join requests
- ✅ Student removal by teacher
- ✅ Classroom activity monitoring
- ✅ Dark/Light mode
- ✅ Read-only mode after semester ends

### Could Have
- ✅ Profile editing system
- ✅ Search and filter classrooms
- ✅ Chat message history export

## Development Guidelines

### Frontend Development
- Use HTML5 for semantic markup
- CSS3 for styling with Grid/Flexbox
- Vanilla JavaScript only when necessary
- Store pages in `/public/pages/`
- Store styles in `/public/assets/styles/`
- Store utilities in `/src/utils/`

### Backend Development
- Express.js for routing
- MongoDB with Mongoose for data
- JWT for authentication
- Services for business logic
- Controllers for request handling
- Keep middleware in `src/middleware/`
- Socket handlers in `src/sockets/`

### Code Organization
- **Admin App**: System-wide features, user management
- **Local App**: Classroom management, student/teacher features
- **Shared**: Common utilities both apps can use
- **Database**: Shared schemas and migrations

### Environment Setup
Use `.env` file for sensitive data. Never commit `.env` file to repository.

### Database
- Use MongoDB Atlas for cloud or local MongoDB instance
- Create indexes in migrations for better performance
- Follow naming conventions in schemas

## Testing

```bash
npm test
```

## Deployment

Refer to `docs/DEPLOYMENT.md` for production deployment instructions.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is not publicly licensed.

## Support

For issues and questions, please create an issue in the repository.

---

**Version**: 1.0.0  
**Last Updated**: March 2026
