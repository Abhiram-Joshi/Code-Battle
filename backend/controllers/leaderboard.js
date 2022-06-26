const Leaderboard = require('../models/leaderboard');

exports.createLeaderboardUser = async (req, res) => {
    const { email, categoryName } = req.body;

    try {
        const leaderboardUser = new Leaderboard({ email, categoryName, points });
        await leaderboardUser.save();

        res.status(201).json({
            status: "success",
            message: "Leaderboard user created successfuly",
            data: null,
        });
    } catch (err) {
        res.status(409).json({
            status: "error",
            message: err.message,
            data: null,
        })
    }
}