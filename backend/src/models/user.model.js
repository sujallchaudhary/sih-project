const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    teamId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        default: null
    },
    photoURL: {
        type: String,
        default: null
    },
    googleProfile: {
        displayName: String,
        givenName: String,
        familyName: String,
        locale: String
    },
    lastLoginAt: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
userSchema.index({ firebaseUid: 1 });
userSchema.index({ email: 1 });


module.exports = mongoose.model('User', userSchema);