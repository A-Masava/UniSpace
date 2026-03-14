// Teacher Schema
import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    teacherId: {
        type: String,
        required: true,
        unique: true
    },
    department: String,
    specialization: String,
    createdClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Teacher', teacherSchema);
