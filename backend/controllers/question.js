const Question = require('../models/question');

exports.getQuestion = (req, res) => {
    const topic = req.body.topic;
    const difficulty = req.body.difficulty;

    var random;
    Question.countDocuments({ topic: topic, difficulty: difficulty }, (err, count) => {
        random = Math.floor(Math.random() * count)
    })

    Question.find({ topic: topic, difficulty: difficulty })
        .then(question => {
            res.status(200).json({
                status: "success",
                message: "Question fetched successfully",
                data: question[random]
            });
        }).catch(err => {
            res.status(500).json({
                status: "error",
                message: err.message,
                data: null,
            });
        });
}