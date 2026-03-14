# Development Setup Guide

## Prerequisites

- Node.js v24.0.0 or higher
- MongoDB v8.2 LTS (can be installed locally or use MongoDB Atlas)
- npm or yarn

## Step 1: Install Dependencies

From the root directory, install all workspace dependencies:

```bash
npm install
```

This will automatically install dependencies for:
- Root workspace
- Client application
- Server application
- Shared utilities

## Step 2: Environment Setup

1. Copy `.env.example` to `.env` in the root directory:
```bash
cp .env.example .env
```

2. Update the `.env` file with your values:
```env
# Server
SERVER_PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/unispace
MONGODB_USER=your_username
MONGODB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key_here

# Client
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Step 3: MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: `mongod`
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

### Option B: MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Copy the connection string and update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unispace?retryWrites=true&w=majority
```

## Step 4: Run the Application

### Development Mode (Both client and server)

```bash
npm run dev
```

This runs both client and server concurrently using nodemon for hot reload.

### Or Run Separately

**Terminal 1 - Backend Server:**
```bash
npm run server
```
Server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run client
```
Frontend will run on `http://localhost:3000`

## Step 5: Database Initialization

### Run Migrations
```bash
npm run db:migrate
```

### Seed Sample Data
```bash
npm run db:seed
```

## Development Workflow

### Project Structure
```
demo-unispace/
├── apps/
│   ├── client/          # Frontend (HTML, CSS, JS)
│   └── server/          # Backend (Node.js, Express)
├── packages/
│   └── shared/          # Shared utilities
├── database/            # Schemas and migrations
└── docs/               # Documentation
```

### Creating New Routes

1. Add route file in `apps/server/src/routes/`
2. Create controller in `apps/server/src/controllers/`
3. Add service logic in `apps/server/src/services/`
4. Import and register route in `apps/server/src/index.js`

### Creating New Database Models

1. Add schema file in `apps/server/src/models/`
2. Document schema in `database/schemas/`
3. Create migration if needed in `database/migrations/`

### Socket.IO Events

Add event handlers in `apps/server/src/sockets/handlers.js` and register them in `apps/server/src/index.js`.

### Frontend Components

1. Create HTML pages in `apps/client/public/`
2. Add CSS in `apps/client/public/assets/styles/`
3. Add JavaScript modules in `apps/client/src/`
4. Import modules in `apps/client/src/app.js`

## Debugging

### Backend
Enable debug logging by setting in `.env`:
```
NODE_ENV=development
DEBUG=*
```

### Frontend
Open browser DevTools (F12) and check Console tab for errors.

### MongoDB
Use MongoDB Compass to visualize database:
- Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
- Connect to `mongodb://localhost:27017` or your Atlas URI

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running: `mongo` or `mongosh`
- Check `MONGODB_URI` in `.env`
- Verify firewall allows MongoDB port (27017)

### Port Already in Use
```bash
# Kill process on port 5000
npx lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000      # Windows
```

### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Review the [API documentation](./API.md)
2. Check [Database Schema documentation](../database/schemas/)
3. Explore [Contributing guidelines](./CONTRIBUTING.md)

## Support

For issues or questions:
1. Check existing documentation
2. Review error logs
3. Create an issue in the repository

---

**Last Updated**: March 2026
