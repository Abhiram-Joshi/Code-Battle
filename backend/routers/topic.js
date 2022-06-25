const express = require("express");

const topicController = require("../controllers/topic");

const router = express.Router();

router.get("/all", topicController.getAllTopics);

module.exports = router;