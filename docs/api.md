# UniSpace API Documentation

## Authentication Endpoints

### Login
- **POST** `/api/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, user }`

### Signup
- **POST** `/api/auth/signup`
- **Body**: `{ name, email, password, role }`
- **Response**: `{ token, user }`

## Classroom Endpoints

### Create Classroom
- **POST** `/api/classrooms`
- **Auth**: Required
- **Body**: `{ name, description, subject }`

### Get My Classes
- **GET** `/api/classrooms/my-classes`
- **Auth**: Required

### Join Class
- **POST** `/api/classrooms/join`
- **Auth**: Required
- **Body**: `{ classCode }`

## Resource Endpoints

### Upload Resource
- **POST** `/api/resources`
- **Auth**: Required
- **Body**: FormData with file

### Get Class Resources
- **GET** `/api/resources/:classId`
- **Auth**: Required

## Chat Endpoints

### Send Message
- **POST** `/api/chat/messages`
- **Auth**: Required
- **Body**: `{ conversationId, message }`

### Get Messages
- **GET** `/api/chat/messages/:conversationId`
- **Auth**: Required
