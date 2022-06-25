const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomQuestionScema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "question",
        required: true
    }
});

module.exports = mongoose.model("roomQuestion", roomQuestionScema);