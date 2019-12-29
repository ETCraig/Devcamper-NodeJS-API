const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Add The Course Title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please Add The Description']
    },
    weeks: {
        type: String,
        required: [true, 'Please Add Number Of Weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Please Add The Tuition Cost']
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please Add Minimum Skill Level'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    }
});

module.exports = mongoose.model('Course', CourseSchema);