// Resource Schema Documentation
/*
Resource Model
---------------
Stores uploaded files (PDFs, notes, assignments, etc.)

Fields:
- title: String (required) - Resource title
- description: String - Resource description
- classroom: ObjectId (ref: Classroom) - Associated classroom
- uploadedBy: ObjectId (ref: User) - Uploader (usually teacher)
- fileUrl: String (required) - File storage URL
- fileType: String - MIME type (e.g., 'application/pdf')
- fileSize: Number - File size in bytes
- createdAt: Date - Upload timestamp

Usage:
- Teachers upload lecture notes, assignments, etc.
- Students download resources
- Files stored in /uploads directory
*/

export const resourceSchemaTemplate = {
    title: { type: String, required: true },
    description: String,
    classroom: { type: 'ObjectId', ref: 'Classroom', required: true },
    uploadedBy: { type: 'ObjectId', ref: 'User', required: true },
    fileUrl: { type: String, required: true },
    fileType: String,
    fileSize: Number,
    createdAt: { type: Date, default: 'Date.now' }
};
