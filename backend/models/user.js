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
    },
    points: {
        type: Integer,
        required: true,
        default: 0,
    },
    weeklyPoints: {
        type: Integer,
        required: true,
        default: 0,
    }
});

module.exports = mongoose.model("user", userSchema);