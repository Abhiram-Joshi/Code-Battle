const express = require("express");

const leaderboardController = require("../controllers/leaderboard");

const router = express.Router();

router.get("/overall", leaderboardController.getOverallLeaderboard);
router.get("/topic", leaderboardController.getTopicLeaderboard);
router.get("/userpoints", leaderboardController.getUserPoints);


module.exports = router;