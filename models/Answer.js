const { default: mongoose } = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please provide a content']
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question',
        required: true
    },
    isCorrect: {
        type: Boolean
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Answer', AnswerSchema);