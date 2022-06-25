require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routers/user");
const topicRouter = require("./routers/topic");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/topic", topicRouter);

// Database connection
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@code-battle.sju91.mongodb.net/Code-Battle?retryWrites=true&w=majority`).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})