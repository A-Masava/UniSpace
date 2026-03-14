// Enrollment Schema Documentation
/*
Enrollment Model
-----------------
Tracks student enrollment requests and status

Fields:
- student: ObjectId (ref: Student) - Student requesting enrollment
- classroom: ObjectId (ref: Classroom) - Target classroom
- status: String - 'pending' | 'approved' | 'rejected' | 'enrolled'
- studentIdInRange: Boolean - Whether ID is in classroom's range
- requestedAt: Date - Request timestamp
- approvedAt: Date - Approval timestamp
- approvedBy: ObjectId (ref: Teacher) - Teacher who approved

Workflow:
1. Student requests to join class
2. If ID in range: auto-approve → status='enrolled'
3. If ID outside range: status='pending' → teacher review
4. Teacher approves → status='approved'
5. If approved → status='enrolled'
*/

export const enrollmentSchemaTemplate = {
    student: { type: 'ObjectId', ref: 'Student', required: true },
    classroom: { type: 'ObjectId', ref: 'Classroom', required: true },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected', 'enrolled'],
        default: 'pending'
    },
    studentIdInRange: Boolean,
    requestedAt: { type: Date, default: 'Date.now' },
    approvedAt: Date,
    approvedBy: { type: 'ObjectId', ref: 'Teacher' }
};
