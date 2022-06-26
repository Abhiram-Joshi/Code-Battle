const Leaderboard = require('../models/leaderboard');

exports.createLeaderboardUser = async (email, categoryName) => {
    try {
        const leaderboardUser = new Leaderboard({ email, categoryName, points: 0 });
        await leaderboardUser.save();
    } catch (err) {
        res.status(409).json({
            status: "error",
            message: err.message,
            data: null,
        })
    }
}