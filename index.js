const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const Question = require("./models/Question");
const Quiz = require("./models/Quiz");

app.use(express.json());

connectDB();


app.get("/quizzes", async (req, res) => {
    const quizzes = await Quiz.find();
    res.json(quizzes);
});

//all questions get by quiz id
app.get("/questions/quiz/:id", async (req, res) => {
    const quiz = await Quiz.findById(req.params.id).populate("questions");
    res.json(quiz);
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
}
);



