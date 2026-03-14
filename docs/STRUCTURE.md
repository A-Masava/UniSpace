# Project Structure Documentation

## Overview

UniSpace is organized as a monorepo using npm workspaces, allowing multiple applications and packages to coexist while sharing code and dependencies.

## Directory Layout

```
Demo UniSpace/
│
├── apps/                           # Application packages
│   ├── client/                     # Frontend application
│   │   ├── src/
│   │   │   ├── app.js             # Main app entry point
│   │   │   └── utils.js           # Utility functions
│   │   ├── public/
│   │   │   ├── index.html         # Main HTML page
│   │   │   └── assets/
│   │   │       ├── styles/        # CSS files
│   │   │       │   ├── index.css
│   │   │       │   ├── auth.css
│   │   │       │   └── dashboard.css
│   │   │       ├── images/        # Image assets
│   │   │       └── icons/         # Icon assets
│   │   └── package.json
│   │
│   └── server/                     # Backend API server
│       ├── src/
│       │   ├── index.js           # Server entry point
│       │   ├── config/
│       │   │   └── index.js       # Configuration management
│       │   ├── controllers/        # Request handlers
│       │   │   ├── authController.js
│       │   │   ├── userController.js
│       │   │   └── classroomController.js
│       │   ├── models/            # Mongoose schemas
│       │   │   ├── User.js
│       │   │   ├── Student.js
│       │   │   ├── Teacher.js
│       │   │   ├── Classroom.js
│       │   │   ├── Message.js
│       │   │   └── Resource.js
│       │   ├── routes/            # API route definitions
│       │   ├── middleware/        # Express middleware
│       │   │   └── auth.js
│       │   ├── services/          # Business logic
│       │   │   ├── authService.js
│       │   │   ├── studentService.js
│       │   │   └── classroomService.js
│       │   ├── sockets/           # Socket.IO handlers
│       │   │   └── handlers.js
│       │   └── utils/             # Utilities
│       │       └── helpers.js
│       ├── uploads/               # User uploaded files
│       └── package.json
│
├── packages/                       # Reusable packages
│   └── shared/                     # Shared code
│       ├── src/
│       │   ├── constants.js       # Shared constants
│       │   ├── validators.js      # Validation functions
│       │   └── database.js        # DB configuration
│       └── package.json
│
├── database/                       # Database layer
│   ├── schemas/                   # Schema documentation
│   │   ├── User.schema.js
│   │   ├── Classroom.schema.js
│   │   ├── Message.schema.js
│   │   ├── Enrollment.schema.js
│   │   └── Resource.schema.js
│   ├── migrations/                # Database migrations
│   │   ├── runner.js
│   │   └── 001_create_users_collection.js
│   └── seeds/                     # Sample data
│       ├── runner.js
│       └── seed_users.js
│
├── docs/                          # Documentation
│   ├── API.md                     # API documentation
│   ├── SETUP.md                   # Setup guide
│   ├── STRUCTURE.md              # This file
│   ├── DATABASE.md               # Database design
│   └── DEPLOYMENT.md             # Deployment guide
│
├── scripts/                       # Utility scripts
│   ├── build.js
│   ├── start.js
│   └── dev.js
│
├── .github/                       # GitHub configuration
│   └── workflows/                 # CI/CD workflows
│       └── tests.yml
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Root workspace config
├── README.md                     # Project overview
└── LICENSE                       # License file
```

## Key Directories Explained

### `/apps/client`
- **Purpose**: Frontend user interface
- **Technology**: HTML5, CSS3, Vanilla JavaScript
- **Responsibilities**:
  - User authentication UI (login/signup)
  - Student dashboard
  - Teacher dashboard
  - Real-time chat interface
  - Resource upload/download UI
  - Admin interface

### `/apps/server`
- **Purpose**: Backend API and real-time server
- **Technology**: Node.js, Express, Socket.IO, MongoDB
- **Responsibilities**:
  - REST API endpoints
  - Authentication & authorization
  - Database operations
  - Real-time communication via Socket.IO
  - File upload handling
  - Business logic implementation

### `/packages/shared`
- **Purpose**: Code reusability across apps
- **Exports**:
  - Constants (roles, statuses, endpoints)
  - Validation functions
  - Database configuration
  - Utility functions

### `/database`
- **Purpose**: Database schema definitions and migrations
- **Contents**:
  - Schema documentation
  - Migration scripts
  - Seed data

### `/docs`
- **Purpose**: Project documentation
- **Standard Files**:
  - `API.md` - API endpoint documentation
  - `SETUP.md` - Development setup guide
  - `DATABASE.md` - Database design documentation
  - `DEPLOYMENT.md` - Production deployment guide

### `/scripts`
- **Purpose**: Automation scripts
- **Examples**:
  - Build scripts
  - Database initialization
  - Testing utilities

## Monorepo Workspace Structure

The project uses npm workspaces declared in root `package.json`:

```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

This allows:
- Unified dependency management
- Shared node_modules
- Cross-workspace imports
- Single npm install

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Controllers | `*Controller.js` | `authController.js` |
| Models | PascalCase | `User.js` |
| Services | `*Service.js` | `authService.js` |
| Utilities | `*Util.js` or `*Helper.js` | `validators.js` |
| Routes | `*Route.js` | `authRoute.js` |
| Middlewares | `*Middleware.js` | `authMiddleware.js` |
| Sockets | `*Handler.js` | `chatHandler.js` |
| CSS Styles | `*.css` | `index.css` |
| HTML Pages | `*.html` | `dashboard.html` |

## Code Organization Principles

### Backend (/apps/server/src)

1. **Controllers** - Request/response handling
   - Parse requests
   - Validate inputs
   - Call services
   - Return responses

2. **Services** - Business logic
   - Core logic implementation
   - Database interactions via models
   - Error handling

3. **Models** - Data layer
   - Schema definitions
   - Database queries
   - Model methods

4. **Middleware** - Request interception
   - Authentication
   - Authorization
   - Validation
   - Error handling

5. **Utils** - Helper functions
   - String manipulation
   - Date formatting
   - Validation helpers

### Frontend (/apps/client)

1. **public/** - Static assets
   - HTML pages
   - CSS stylesheets
   - Images and icons

2. **src/** - JavaScript modules
   - Page logic
   - Event handlers
   - API communication
   - Utility functions

## Dependency Management

### Cross-Package Imports

Import shared utilities in both client and server:

```javascript
// In server app
import { ROLES, validateEmail } from '@demo-unispace/shared/src/constants.js';

// In client app
import { API_ENDPOINTS } from '@demo-unispace/shared/src/constants.js';
```

### NPM Scripts

Root package.json provides workspace-aware commands:

```bash
npm run dev                 # Run all in dev mode
npm run build              # Build all workspaces
npm run server             # Server only
npm run client             # Client only
npm run db:migrate         # Database migrations
npm run db:seed           # Database seeds
```

## Adding New Files

### New Backend Route
1. Create file in `apps/server/src/routes/`
2. Create controller in `apps/server/src/controllers/`
3. Import in `apps/server/src/index.js`

### New Database Model
1. Create schema in `apps/server/src/models/`
2. Document in `database/schemas/`
3. Create migration if needed

### New Frontend Page
1. Create HTML in `apps/client/public/`
2. Add CSS in `apps/client/public/assets/styles/`
3. Add JS in `apps/client/src/`
4. Import module in `apps/client/src/app.js`

### New Shared Utility
1. Add to appropriate file in `packages/shared/src/`
2. Export from module
3. Import where needed

## Build & Deployment Structure

```
dist/
├── client/               # Built frontend
│   ├── index.html
│   └── assets/
├── server/               # Built backend
│   └── src/
└── shared/              # Built shared package
```

---

**Last Updated**: March 2026
