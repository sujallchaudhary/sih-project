const mongoose = require('mongoose');

const choosenPsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemStatementId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProblemStatement',
        required: true
    },
    teamId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('ChoosenPs', choosenPsSchema);