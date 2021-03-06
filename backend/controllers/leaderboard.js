const Leaderboard = require('../models/leaderboard');

exports.createLeaderboardUser = async (email, categoryName) => {
    await Leaderboard.updateOne({ email: email }, { email: email, categoryName: categoryName, points: 0 }, { upsert: true });
}

exports.getOverallLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find({}).sort({ points: -1 }).limit(5);
        res.status(200).json({
            status: "success",
            message: "Overall leaderboard",
            data: leaderboard,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
            data: null,
        });
    }
}

exports.getTopicLeaderboard = async (req, res) => {
    const topic = req.body.topic;

    try {
        const leaderboard = await Leaderboard.find({ categoryName: topic }).sort({ points: -1 }).limit(5);
        res.status(200).json({
            status: "success",
            message: "Topic leaderboard",
            data: leaderboard,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
            data: null,
        });
    }
}

exports.getUserPoints = async (req, res) => {
    const { email, categoryName } = req.body;

    try {
        const user = await Leaderboard.findOne({ email, categoryName });
        res.status(200).json({
            status: "success",
            message: "User points",
            data: user.points,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
            data: null,
        });
    }
}