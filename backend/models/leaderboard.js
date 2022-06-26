const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
    userID: {
        type: email,
        required: true,
        unique: true,
    },
    categoryID: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("leaderboard", leaderboardSchema);