# Code Organization Guide

This guide explains exactly where to place frontend and backend code in the UniSpace monorepo structure.

## 📁 Complete Monorepo Structure

```
Demo UniSpace/
│
├── apps/
│   ├── client/                                # 🎨 FRONTEND APPLICATION
│   │   ├── public/                            # Static files served to browser
│   │   │   ├── pages/                         # HTML page files
│   │   │   │   ├── home.html                  # Landing page
│   │   │   │   ├── login.html                 # Login form
│   │   │   │   ├── signup.html                # Registration form
│   │   │   │   ├── student-dashboard.html     # Student portal
│   │   │   │   └── teacher-dashboard.html     # Teacher portal
│   │   │   └── assets/                        # Static assets
│   │   │       ├── styles/                    # CSS stylesheets
│   │   │       │   ├── index.css              # Global styles
│   │   │       │   ├── layouts/               # Page layout styles
│   │   │       │   │   ├── landing.css        # Home page styles
│   │   │       │   │   ├── auth.css           # Login/Signup styles
│   │   │       │   │   └── dashboard.css      # Dashboard styles
│   │   │       │   └── components/            # Reusable component styles
│   │   │       │       ├── sidebar.css        # Sidebar styling
│   │   │       │       ├── class-card.css     # Card components
│   │   │       │       └── modal.css          # Modal styling
│   │   │       ├── images/                    # Image assets (logos, etc)
│   │   │       └── icons/                     # Icon assets
│   │   └── src/                               # JavaScript source code
│   │       ├── api/                           # API communication layer
│   │       │   └── client.js                  # All HTTP requests
│   │       ├── sockets/                       # Socket.IO real-time
│   │       │   └── manager.js                 # WebSocket connection
│   │       ├── utils/                         # Utility functions
│   │       │   ├── auth.js                    # Authentication helpers
│   │       │   └── dom.js                     # DOM manipulation
│   │       └── pages/                         # Page-specific logic
│   │           ├── login.js                   # Login form logic
│   │           ├── signup.js                  # Signup form logic
│   │           ├── student-dashboard.js       # Student page logic
│   │           └── teacher-dashboard.js       # Teacher page logic
│   └── package.json                           # Client dependencies
│
│
├── apps/
│   └── server/                                # 🖥️ BACKEND APPLICATION
│       ├── src/
│       │   ├── index.js                       # Server entry point
│       │   ├── config/
│       │   │   └── index.js                   # Database & app config
│       │   ├── routes/                        # API endpoint routes
│       │   │   ├── authRoutes.js              # /api/auth/* routes
│       │   │   ├── userRoutes.js              # /api/users/* routes
│       │   │   ├── classroomRoutes.js         # /api/classrooms/* routes
│       │   │   ├── messageRoutes.js           # /api/messages/* routes
│       │   │   └── resourceRoutes.js          # /api/resources/* routes
│       │   ├── controllers/                   # Request handlers
│       │   │   ├── authController.js          # Login/signup logic
│       │   │   ├── userController.js          # User operations
│       │   │   ├── classroomController.js     # Classroom operations
│       │   │   ├── messageController.js       # Message operations
│       │   │   └── resourceController.js      # File upload logic
│       │   ├── models/                        # MongoDB schemas
│       │   │   ├── User.js                    # User schema
│       │   │   ├── Student.js                 # Student schema
│       │   │   ├── Teacher.js                 # Teacher schema
│       │   │   ├── Classroom.js               # Classroom schema
│       │   │   ├── Message.js                 # Message schema
│       │   │   └── Resource.js                # File schema
│       │   ├── services/                      # Business logic
│       │   │   ├── authService.js             # Auth logic (hashing, JWT)
│       │   │   ├── studentService.js          # Student operations
│       │   │   ├── classroomService.js        # Classroom operations
│       │   │   ├── messageService.js          # Message operations
│       │   │   └── resourceService.js         # File operations
│       │   ├── middleware/                    # Express middleware
│       │   │   ├── auth.js                    # JWT verification
│       │   │   ├── validation.js              # Input validation
│       │   │   └── errorHandler.js            # Error handling
│       │   ├── sockets/                       # Socket.IO handlers
│       │   │   ├── handlers.js                # Chat/notification handlers
│       │   │   └── events.js                  # Event definitions
│       │   └── utils/                         # Utility functions
│       │       ├── helpers.js                 # Common helpers
│       │       └── validators.js              # Validation functions
│       ├── uploads/                           # User uploaded files
│       │   └── .gitkeep                       # Placeholder for uploads
│       └── package.json                       # Server dependencies
│
│
├── packages/
│   └── shared/                                # 🔗 SHARED CODE
│       ├── src/
│       │   ├── constants.js                   # Shared constants
│       │   ├── validators.js                  # Shared validation
│       │   └── database.js                    # DB configuration
│       └── package.json
│
│
├── database/                                  # 📊 DATABASE LAYER
│   ├── schemas/                               # Schema documentation
│   │   ├── User.schema.js                     # User structure
│   │   ├── Classroom.schema.js                # Classroom structure
│   │   ├── Message.schema.js                  # Message structure
│   │   ├── Enrollment.schema.js               # Enrollment structure
│   │   └── Resource.schema.js                 # Resource structure
│   ├── migrations/                            # Database versioning
│   │   ├── runner.js                          # Migration runner
│   │   └── 001_create_users_collection.js     # Example migration
│   └── seeds/                                 # Initial sample data
│       ├── runner.js                          # Seed runner
│       └── seed_users.js                      # Sample users
│
│
├── docs/                                      # 📖 DOCUMENTATION
│   ├── API.md                                 # API endpoints
│   ├── SETUP.md                               # Setup guide
│   ├── STRUCTURE.md                           # Project structure
│   └── DEPLOYMENT.md                          # Deploy guide
│
├── scripts/                                   # 🔧 AUTOMATION SCRIPTS
│   ├── build.js                               # Build script
│   └── deploy.js                              # Deploy script
│
├── .github/workflows/                         # 🔄 CI/CD
│   └── tests.yml                              # GitHub Actions
│
├── .env.example                               # Environment template
├── .gitignore                                 # Git ignore rules
├── package.json                               # Root workspace config
└── README.md                                  # Project overview
```

---

## 🎨 FRONTEND CODE PLACEMENT

### Where to Put Frontend Files

#### **1. HTML Pages** → `/apps/client/public/pages/`
```
pages/
├── home.html              # Landing/welcome page
├── login.html             # Authentication page
├── signup.html            # Registration page
├── student-dashboard.html # Student interface
└── teacher-dashboard.html # Teacher interface
```

**Rules:**
- One HTML file per page/route
- Use semantic HTML5 tags
- Link to CSS in `<head>` using `/assets/styles/`
- Link to JS at end of `<body>` using `/src/pages/`

**Example:**
```html
<head>
    <link rel="stylesheet" href="/assets/styles/index.css">
    <link rel="stylesheet" href="/assets/styles/layouts/dashboard.css">
    <link rel="stylesheet" href="/assets/styles/components/sidebar.css">
</head>
<body>
    <!-- Content here -->
    <script type="module" src="/src/pages/student-dashboard.js"></script>
</body>
```

---

#### **2. CSS Stylesheets** → `/apps/client/public/assets/styles/`

```
styles/
├── index.css              # Global base styles, colors, typography
├── layouts/
│   ├── landing.css        # Home page layout
│   ├── auth.css           # Login/signup layout
│   └── dashboard.css      # Dashboard layout
└── components/
    ├── sidebar.css        # Sidebar component
    ├── class-card.css     # Card components
    └── modal.css          # Modal components
```

**Rules:**
- `index.css` = Global styles (colors, fonts, base elements)
- `layouts/*.css` = Page-specific layouts
- `components/*.css` = Reusable component styles
- All stylesheets are imported in HTML files

**Example:**
```css
/* For a component like class cards */
.class-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
}

.class-card:hover {
    transform: translateY(-8px);
}
```

---

#### **3. JavaScript Logic** → `/apps/client/src/`

```
src/
├── api/
│   └── client.js          # All HTTP requests (fetch API)
├── sockets/
│   └── manager.js         # Socket.IO connection & events
├── utils/
│   ├── auth.js            # Auth helpers (token, user data)
│   └── dom.js             # DOM manipulation helpers
└── pages/
    ├── login.js           # Login page logic
    ├── signup.js          # Signup page logic
    ├── student-dashboard.js
    └── teacher-dashboard.js
```

**Rules:**
- **`api/client.js`** = ALL HTTP requests to backend
  - Login, register, fetch classes, etc.
  - Returns promises
  
- **`sockets/manager.js`** = Real-time Socket.IO handling
  - Chat messages
  - Notifications
  - Real-time updates
  
- **`utils/auth.js`** = Authentication utilities
  - Store/retrieve tokens
  - Check if user is logged in
  - Get current user data
  
- **`utils/dom.js`** = DOM helpers
  - Show/hide elements
  - Get form data
  - Add/remove classes
  
- **`pages/*.js`** = Page-specific logic
  - Form submissions
  - Load data for page
  - Handle user interactions

**Example - Login Page:**
```javascript
// /src/pages/login.js
import { apiService } from '../api/client.js';
import { authUtils } from '../utils/auth.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await apiService.login(email, password);
    authUtils.saveAuthData(response.token, response.user);
    window.location.href = '/pages/student-dashboard.html';
});
```

---

#### **4. Static Assets** → `/apps/client/public/assets/`

```
assets/
├── images/
│   ├── logo.png
│   ├── hero-illustration.png
│   └── ...
└── icons/
    ├── class-icon.svg
    ├── chat-icon.svg
    └── ...
```

---

## 🖥️ BACKEND CODE PLACEMENT

### Where to Put Backend Files

#### **1. Routes** → `/apps/server/src/routes/`
```
routes/
├── authRoutes.js          # POST /api/auth/login, /register, /logout
├── userRoutes.js          # GET /api/users/profile, PUT /profile
├── classroomRoutes.js     # POST /api/classrooms, GET, etc
├── messageRoutes.js       # Messages API routes
└── resourceRoutes.js      # File upload/download routes
```

**Rules:**
- Group related endpoints in one route file
- Use Express Router
- Include request validation
- Call controllers for business logic

**Example:**
```javascript
// /src/routes/authRoutes.js
import { Router } from 'express';
import { authController } from '../controllers/authController.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
```

---

#### **2. Controllers** → `/apps/server/src/controllers/`
```
controllers/
├── authController.js      # Login, register, logout logic
├── userController.js      # User profile operations
├── classroomController.js # Create, edit, delete classes
├── messageController.js   # Send, retrieve messages
└── resourceController.js  # Upload, download files
```

**Rules:**
- Receive requests from routes
- Call services for business logic
- Return responses to client
- Handle HTTP status codes

**Example:**
```javascript
// /src/controllers/authController.js
import { authService } from '../services/authService.js';

export const authController = {
    register: async (req, res) => {
        try {
            const { email, password, fullname, role } = req.body;
            const result = await authService.register(email, password, fullname, role);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
```

---

#### **3. Services** → `/apps/server/src/services/`
```
services/
├── authService.js         # Password hashing, JWT generation
├── studentService.js      # Student-specific operations
├── classroomService.js    # Classroom business logic
├── messageService.js      # Message operations
└── resourceService.js     # File handling logic
```

**Rules:**
- Pure business logic (NO HTTP stuff)
- Interact with models/database
- Password hashing, JWT tokens, calculations
- Can be reused by multiple routes

**Example:**
```javascript
// /src/services/authService.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authService = {
    register: async (email, password, fullname, role) => {
        // Check if user exists
        const exists = await User.findOne({ email });
        if (exists) throw new Error('User already exists');
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = await User.create({
            email, fullname, role,
            password: hashedPassword
        });
        
        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        return { token, user };
    }
};
```

---

#### **4. Models** → `/apps/server/src/models/`
```
models/
├── User.js                # User schema with methods
├── Student.js             # Student schema
├── Teacher.js             # Teacher schema
├── Classroom.js           # Classroom schema
├── Message.js             # Message schema
└── Resource.js            # File/resource schema
```

**Rules:**
- Define MongoDB schemas
- Add model methods (statics, instance methods)
- Include validation
- Handle relationships

**Example:**
```javascript
// /src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    createdAt: { type: Date, default: Date.now }
});

// Instance method
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
```

---

#### **5. Middleware** → `/apps/server/src/middleware/`
```
middleware/
├── auth.js                # JWT verification
├── validation.js          # Input validation
└── errorHandler.js        # Global error handling
```

**Rules:**
- Check authentication (JWT)
- Validate request data
- Handle errors globally
- Parse requests

**Example:**
```javascript
// /src/middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
```

---

#### **6. Socket.IO Handlers** → `/apps/server/src/sockets/`
```
sockets/
├── handlers.js            # Chat, notifications
└── events.js              # Event definitions
```

**Rules:**
- Handle real-time events
- Broadcast updates
- No database directly (call services)

**Example:**
```javascript
// /src/sockets/handlers.js
export const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        socket.on('join-room', (data) => {
            socket.join(data.room);
            socket.to(data.room).emit('user-joined', {
                userId: socket.id,
                message: 'User joined'
            });
        });

        socket.on('send-message', (data) => {
            socket.to(data.room).emit('receive-message', data);
        });
    });
};
```

---

#### **7. Server Entry Point** → `/apps/server/src/index.js`
```javascript
// This is where everything connects
import express from 'express';
import { io } from 'socket.io';

// Middleware
app.use(cors(), helmet(), express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classrooms', classroomRoutes);
// ... more routes

// Socket.IO
setupSocketHandlers(io);

// Start server
server.listen(5000);
```

---

## 🔗 Data Flow Example

### Frontend → Backend Communication

```
User Login Page
  ↓
/src/pages/login.js (handle form submit)
  ↓
/src/api/client.js (apiService.login(email, pass))
  ↓
POST http://localhost:5000/api/auth/login
  ↓
Backend
  ├─ /src/routes/authRoutes.js (route definition)
  ├─ /src/controllers/authController.js (receive request)
  ├─ /src/services/authService.js (hash password, verify, generate JWT)
  ├─ /src/models/User.js (database queries)
  │
Response {token, user}
  ↓
/src/utils/auth.js (save token to localStorage)
  ↓
Redirect to /pages/student-dashboard.html
```

---

## 📋 Checklist for Adding New Features

### Adding a New API Endpoint

1. **Create Route** → `/apps/server/src/routes/newRoutes.js`
2. **Create Controller** → `/apps/server/src/controllers/newController.js`
3. **Create Service** → `/apps/server/src/services/newService.js`
4. **Update Model** → `/apps/server/src/models/NewModel.js` (if needed)
5. **Register Route** → Add to `/apps/server/src/index.js`
6. **Update API Client** → Add to `/apps/client/src/api/client.js`
7. **Update Frontend** → Call API from `/apps/client/src/pages/*.js`

### Adding a New Page

1. **Create HTML** → `/apps/client/public/pages/newpage.html`
2. **Create CSS** → `/apps/client/public/assets/styles/layouts/newpage.css`
3. **Create JS Logic** → `/apps/client/src/pages/newpage.js`
4. **Add Navigation** → Update sidebar/menu links

### Adding a New Component

1. **Create CSS** → `/apps/client/public/assets/styles/components/newcomponent.css`
2. **Use in HTML** → Add to any page that needs it
3. **Add JS** → If interactive, add to relevant page JS file

---

## ✅ Rules Summary

| Layer | Location | Purpose |
|-------|----------|---------|
| **Frontend** | `/apps/client/public/pages/` | HTML pages |
| **Styling** | `/apps/client/public/assets/styles/` | CSS files |
| **Logic** | `/apps/client/src/pages/` | Page-specific JS |
| **API** | `/apps/client/src/api/` | HTTP requests |
| **Sockets** | `/apps/client/src/sockets/` | Real-time events |
| **Utilities** | `/apps/client/src/utils/` | Helper functions |
| **Routes** | `/apps/server/src/routes/` | API endpoint definitions |
| **Controllers** | `/apps/server/src/controllers/` | Request handlers |
| **Services** | `/apps/server/src/services/` | Business logic |
| **Models** | `/apps/server/src/models/` | Database schemas |
| **Middleware** | `/apps/server/src/middleware/` | Request processing |
| **Sockets** | `/apps/server/src/sockets/` | Real-time handlers |

---

This structure keeps frontend and backend clearly separated while maintaining a professional monorepo organization. Anyone looking at the folder structure can immediately understand where code belongs!
