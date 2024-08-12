const { default: mongoose } = require("mongoose");


const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        minlength: [10, 'Please provide a title at least 10 characters'],
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Question', QuestionSchema);