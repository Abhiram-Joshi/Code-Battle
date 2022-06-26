const express = require("express");

const questionController = require("../controllers/question");

const router = express.Router();

router.get("/get", questionController.getQuestion);

module.exports = router;