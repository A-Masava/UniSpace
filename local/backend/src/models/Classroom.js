// Classroom Schema
import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    classCode: {
        type: String,
        required: true,
        unique: true
    },
    className: {
        type: String,
        required: true
    },
    description: String,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    batch: String,
    studentIdRange: {
        minId: Number,
        maxId: Number
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    resources: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    isArchived: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Classroom', classroomSchema);
