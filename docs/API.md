# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
Body: {
  fullname: string,
  email: string,
  password: string,
  role: 'student' | 'teacher'
}
Response: { user, token }
```

#### Login
```
POST /auth/login
Body: {
  email: string,
  password: string
}
Response: { user, token }
```

#### Logout
```
POST /auth/logout
Headers: Authorization: Bearer <token>
Response: { message: "Logged out successfully" }
```

### Users

#### Get Profile
```
GET /users/profile
Headers: Authorization: Bearer <token>
Response: { user }
```

#### Update Profile
```
PUT /users/profile
Headers: Authorization: Bearer <token>
Body: { fullname, profileImage, ... }
Response: { user }
```

### Classrooms

#### Create Classroom (Teacher only)
```
POST /classrooms
Headers: Authorization: Bearer <token>
Body: {
  className: string,
  classCode: string,
  semester: string,
  studentIdRange: { minId: number, maxId: number },
  description: string
}
Response: { classroom }
```

#### Get All Classrooms
```
GET /classrooms
Headers: Authorization: Bearer <token>
Response: { classrooms: [] }
```

#### Get Classroom by ID
```
GET /classrooms/:id
Headers: Authorization: Bearer <token>
Response: { classroom }
```

#### Update Classroom (Teacher only)
```
PUT /classrooms/:id
Headers: Authorization: Bearer <token>
Body: { className, description, ... }
Response: { classroom }
```

#### Delete Classroom (Teacher only)
```
DELETE /classrooms/:id
Headers: Authorization: Bearer <token>
Response: { message: "Classroom deleted" }
```

### Enrollment

#### Enroll in Classroom
```
POST /classrooms/:id/enroll
Headers: Authorization: Bearer <token>
Body: { studentId: number }
Response: { enrollment }
```

#### Approve Student Enrollment (Teacher only)
```
POST /classrooms/:id/approve/:studentId
Headers: Authorization: Bearer <token>
Response: { enrollment }
```

#### Reject Student Enrollment (Teacher only)
```
POST /classrooms/:id/reject/:studentId
Headers: Authorization: Bearer <token>
Response: { message: "Enrollment rejected" }
```

### Messages

#### Send Message
```
POST /messages
Headers: Authorization: Bearer <token>
Body: {
  content: string,
  classroomId: string,
  receiverId: string (optional)
}
Response: { message }
```

#### Get Messages for Classroom
```
GET /messages/classroom/:classroomId
Headers: Authorization: Bearer <token>
Response: { messages: [] }
```

### Resources

#### Upload Resource
```
POST /resources
Headers: Authorization: Bearer <token>
Body: FormData with file
Response: { resource }
```

#### Get Resources for Classroom
```
GET /classrooms/:id/resources
Headers: Authorization: Bearer <token>
Response: { resources: [] }
```

#### Download Resource
```
GET /resources/:id/download
Headers: Authorization: Bearer <token>
Response: File stream
```

## Socket.IO Events

### Connection
```javascript
const socket = io('http://localhost:5000', {
  auth: { token: 'your_jwt_token' }
});
```

### Chat Events

#### Join Room
```javascript
socket.emit('join-room', { room: 'classroom_id' });
socket.on('user-joined', (data) => console.log(data));
```

#### Send Message
```javascript
socket.emit('send-message', {
  room: 'classroom_id',
  content: 'message content'
});
socket.on('receive-message', (data) => console.log(data));
```

#### Leave Room
```javascript
socket.emit('leave-room', { room: 'classroom_id' });
socket.on('user-left', (data) => console.log(data));
```

### Notifications
```javascript
socket.on('notification', (data) => console.log(data));
```

## Error Responses

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message",
  "statusCode": 400
}
```
