// Classroom Schema Documentation
/*
Classroom Model
----------------
Stores classroom/course information

Fields:
- classCode: String (required, unique) - Unique classroom identifier
- className: String (required) - Name of the class
- description: String - Classroom description
- teacher: ObjectId (ref: Teacher) - Teacher who created the class
- semester: String - Academic semester
- batch: String - Student batch/cohort
- studentIdRange: Object - ID range for automatic enrollment
  - minId: Number - Minimum student ID (inclusive)
  - maxId: Number - Maximum student ID (inclusive)
- students: [ObjectId] - Array of enrolled students
- resources: [ObjectId] - Array of uploaded resources
- isArchived: Boolean - Archive status
- createdAt: Date - Creation timestamp

Workflow:
1. Teacher creates classroom with studentIdRange
2. Students with IDs in range auto-enroll
3. Students outside range need teacher approval
4. Teacher can manage students and resources
5. At semester end, teacher archives the class
*/

export const classroomSchemaTemplate = {
    classCode: { type: String, required: true, unique: true },
    className: { type: String, required: true },
    description: String,
    teacher: { type: 'ObjectId', ref: 'Teacher', required: true },
    semester: { type: String, required: true },
    batch: String,
    studentIdRange: {
        minId: Number,
        maxId: Number
    },
    students: [{ type: 'ObjectId', ref: 'Student' }],
    resources: [{ type: 'ObjectId', ref: 'Resource' }],
    isArchived: { type: Boolean, default: false },
    createdAt: { type: Date, default: 'Date.now' }
};
