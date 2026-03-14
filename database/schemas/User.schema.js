// User Schema Documentation
/*
User Model
----------
Stores information about all users (students, teachers, admins)

Fields:
- fullname: String (required) - User's full name
- email: String (required, unique) - User's email address
- password: String (required) - Hashed password
- role: String - 'student' | 'teacher' | 'admin'
- profileImage: String - URL to profile image
- isActive: Boolean - Account status
- createdAt: Date - Account creation timestamp
- updatedAt: Date - Last update timestamp

Indexes:
- email (unique)
- role
*/

export const userSchemaTemplate = {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    profileImage: String,
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
};
