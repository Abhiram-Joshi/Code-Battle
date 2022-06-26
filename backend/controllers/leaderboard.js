const Leaderboard = require('../models/leaderboard');

exports.createLeaderboardUser = async (email, categoryName) => {
    
    await Leaderboard.updateOne({ email: email }, { email: email, categoryName: categoryName, points: 0 }, { upsert: true });
}