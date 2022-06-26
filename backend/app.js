require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routers/user");
const topicRouter = require("./routers/topic");
const questionRouter = require("./routers/question");
const leaderboardRouter = require("./routers/leaderboard");

const attachUser = require("./middlewares/attachUser");

const roomSocket = require("./controllers/room");

const app = express();
const server = require('http').createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/question", questionRouter);
app.use("/lb", leaderboardRouter);
app.use("/topic", attachUser, topicRouter);

// Database connection
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@code-battle.sju91.mongodb.net/Code-Battle?retryWrites=true&w=majority`).then(() => {
    // const server = app.listen(3000);
    const io = require("socket.io")(server, {cors: {origin: "*"}});
    server.listen(3000);
    roomSocket(io);
}).catch(err => {
    console.log(err);
})