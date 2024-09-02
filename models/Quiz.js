const { default: mongoose } = require("mongoose");



const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    questions: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Question',
        required: true
    }],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Quiz', QuizSchema);