const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const Quiz = require("./models/Quiz");
const Answer = require("./models/Answer");
const { sendEmail } = require("./service/emailService");
const { User } = require("./models/User");
const { Category } = require("./models/Category");
const { Question } = require("./models/Question");
const Session = require("./models/Session"); // Session modelini içe aktar

const PORT = 8080 || process.env.PORT;

app.use(express.json());

connectDB();

app.get("/categories", async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

app.post("/categories", async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.json(category);
});

app.get("/quizzes", async (req, res) => {
    const quizzes = await Quiz.find();
    res.json(quizzes);
});

// all questions get by quiz id
app.get("/questions/quiz/:id", async (req, res) => {
    let quiz = await Quiz.findById(req.params.id).populate("questions");
    let answers = await Answer.find({ question: { $in: quiz.questions } });

    let response = quiz.questions.map((question) => {
        let answer = answers.filter((answer) => answer.question == question.id);
        return {
            question: question,
            answers: answer
        };
    });

    res.json(response);
});

app.post("/auth", async (req, res) => {
    const { email } = req.body;

    // email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    // kullanıcı kayıtlıysa kayıtlı email adresine email gönderilir ve confirmCode oluşturulur
    let user = await User.findOne({ email });
    var confirmCode = Math.floor(1000 + Math.random() * 9000);

    if (!user) {
        user = await User.create({ email, confirmCode });

        // email send
        sendEmail(email, confirmCode);
        return res.json({ id: user._id });
    } else {
        user.confirmCode = confirmCode;
        await user.save();
        sendEmail(email, confirmCode);
        return res.json({ id: user._id });
    }
});

app.post("/confirm", async (req, res) => {
    const { id, confirmCode } = req.body;
    let user = await User.findById(id);
    if (!user) {
        return res.status(400).json({ message: "Invalid id" });
    }
    if (user.confirmCode == confirmCode) {
        user.confirmed = true;
        await user.save();
        return res.json({ message: "Confirmed" });
    } else {
        return res.status(400).json({ message: "Invalid confirm code" });
    }
});

// Session CRUD endpoints
app.get("/sessions", async (req, res) => {
    const sessions = await Session.find().populate("user answers");
    res.json(sessions);
});

app.get("/sessions/:id", async (req, res) => {
    const session = await Session.findById(req.params.id).populate("user answers");
    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
});

app.post("/sessions", async (req, res) => {
    const { user, answers } = req.body;
    const session = await Session.create({ user, answers });
    res.json(session);
});

app.put("/sessions/:id", async (req, res) => {
    const { user, answers } = req.body;
    const session = await Session.findByIdAndUpdate(req.params.id, { user, answers }, { new: true });
    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
});

app.delete("/sessions/:id", async (req, res) => {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
        return res.status(404).json({ message: "Session not found" });
    }
    res.json({ message: "Session deleted" });
});

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});