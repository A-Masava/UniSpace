# UniSpace - Comprehensive Educational Platform

UniSpace is a full-stack educational platform designed to support admin operations, student learning, and teacher management in a unified ecosystem.

## Features

### Admin System
- User management and monitoring
- Classroom administration
- Analytics and reporting
- System configuration

### Local System (Students & Teachers)
- User authentication (signup/login)
- Classroom creation and management
- Student enrollment with class codes
- Resource sharing and management
- Real-time messaging and chat
- Class scheduling and routines
- Class archival for historical records

## Project Structure

```
unispace/
├── admin/                 # Admin application
│   ├── frontend/         # Admin UI
│   └── backend/          # Admin API
├── local/                # Student/Teacher system
│   ├── frontend/         # Student/Teacher UI
│   └── backend/          # Local API
├── packages/shared/      # Shared utilities
├── database/            # Database schemas and migrations
├── docs/                # Documentation
├── scripts/             # Utility scripts
└── .github/workflows/   # CI/CD pipeline
```

## Quick Start

### Prerequisites
- Node.js v14+
- MongoDB

### Installation
```bash
git clone <repository>
cd unispace
npm install
```

### Development
```bash
npm run dev
```

### Admin
- Frontend: http://localhost:3001
- Backend: http://localhost:5000

### Local
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Documentation
- [Architecture](docs/architecture.md)
- [API Reference](docs/api.md)
- [Setup Guide](docs/setup.md)
- [Project Plan](docs/plan.md)

## Tech Stack
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Real-time**: Socket.io
- **Authentication**: JWT
- **Deployment**: Docker, CI/CD with GitHub Actions

## License
MIT

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## Support
For support, email support@unispace.com or create an issue in the repository.
