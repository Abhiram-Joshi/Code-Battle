const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    categoryName: {
        type: String,
        required: true,
        default: "overall"
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("leaderboard", leaderboardSchema);