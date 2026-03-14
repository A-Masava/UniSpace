// Student Schema
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    department: String,
    semester: String,
    enrolledClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Student', studentSchema);
