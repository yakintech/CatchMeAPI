const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const Question = require("./models/Question");
const Quiz = require("./models/Quiz");
const Answer = require("./models/Answer");


const PORT = 8080 || process.env.PORT;

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


app.post("/auth", async (req, res) => {
    const { email } = req.body;
    
    //email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    //kullanıcı kayıtlıysa kayıtlı email adresine email gönderilir ve confirmCode oluşturulur
    let user = await User.findOne({ email });
    var confirmCode = Math.floor(1000 + Math.random() * 9000);

    if (!user) {
        user = await User.create({ email, confirmCode });
        //email send
    }
    else{
        user.confirmCode = confirmCode;
        await user.save();
        //email send
        //vldw qyyc husx wvka

    }



})


app.listen(PORT, () => {
    console.log("Server is running on port 3000");
}
);



