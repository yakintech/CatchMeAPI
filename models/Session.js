const { default: mongoose } = require("mongoose");

const QuizSession = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    answers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Answer',
        required: true
    }],
},
{
    timestamps: true
});

module.exports = mongoose.model('QuizSession', QuizSession);
