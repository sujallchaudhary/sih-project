const mongoose = require('mongoose');

const psSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Software', 'Hardware'],
        trim: true
    },
    theme: {
        type: String,
        required: true,
        trim: true
    },
    youtube: {
        type: String,
        default: '',
        trim: true
    },
    dataset: {
        type: String,
        default: '',
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    approach:{
        type:Array,
        default: [],
    },
    difficultyLevel: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
    },
    summary: {
        type: String,
        trim: true
    },
    tags:{
        type:Array,
        default: [],
    },
    techStack: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
});

psSchema.index({ title: 'text', description: 'text' });
psSchema.index({ category: 1 });
psSchema.index({ theme: 1 });
psSchema.index({ organization: 1 });

module.exports = mongoose.model('ProblemStatement', psSchema);