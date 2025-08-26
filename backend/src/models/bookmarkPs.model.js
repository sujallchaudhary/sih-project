const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemStatementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProblemStatement',
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);