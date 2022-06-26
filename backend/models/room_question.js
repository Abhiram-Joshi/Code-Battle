const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomQuestionSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    questionID: {
        type: Schema.Types.ObjectId,
        ref: "question",
        required: true
    }
});

module.exports = mongoose.model("roomQuestion", roomQuestionSchema);