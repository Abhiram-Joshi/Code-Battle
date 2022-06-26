const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stmt: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: "topic",
        required: true
    },
    test_cases: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("question", questionSchema);