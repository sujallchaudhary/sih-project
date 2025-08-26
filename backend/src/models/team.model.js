const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    leaderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
},{
    timestamps: true
}
);

module.exports = mongoose.model('Team', teamSchema);