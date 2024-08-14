const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const Question = require("./models/Question");
const Quiz = require("./models/Quiz");
const Answer = require("./models/Answer");

app.use(express.json());

connectDB();


app.get("/quizzes", async (req, res) => {
    const quizzes = await Quiz.find();
    res.json(quizzes);
});

//all questions get by quiz id
app.get("/questions/quiz/:id", async (req, res) => {
    let quiz = await Quiz.findById(req.params.id).populate("questions")
    let answers = await Answer.find({ question: { $in: quiz.questions } });

   let reponse = quiz.questions.map((question) => {
        let answer = answers.filter((answer) => answer.question == question.id);
        return {
            question: question,
            answers: answer
        }
    });
    
    res.json(reponse);
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
}
);



