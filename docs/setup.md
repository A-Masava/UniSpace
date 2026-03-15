# UniSpace Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd UniSpace
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install admin frontend dependencies
cd admin/frontend && npm install

# Install admin backend dependencies
cd ../backend && npm install

# Install local frontend dependencies
cd ../../local/frontend && npm install

# Install local backend dependencies
cd ../backend && npm install
```

### 3. Configure environment variables
Create `.env` files in:
- `admin/backend/.env`
- `local/backend/.env`

Example content:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/unispace
JWT_SECRET=your_secret_key
```

### 4. Start MongoDB
```bash
mongod
```

### 5. Run the application
```bash
# From root directory
npm run dev
```

## Development

### Start individual services
```bash
# Admin backend
cd admin/backend && npm run dev

# Admin frontend
cd admin/frontend && npm start

# Local backend
cd local/backend && npm run dev

# Local frontend
cd local/frontend && npm start
```

## Deployment
For production deployment, refer to deployment guides in the CI/CD workflows.
