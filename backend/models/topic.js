const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("topic", topicSchema);