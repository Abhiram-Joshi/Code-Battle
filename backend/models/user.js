const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    uuid: {
        type: String,
    },
    isOAuth: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model("user", userSchema);