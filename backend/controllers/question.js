const Question = require('../models/question');

exports.getQuestion = (topic, difficulty) => {
    var random;
    Question.countDocuments({ topic: topic, difficulty: difficulty }, (err, count) => {
        random = Math.floor(Math.random() * count);
    });

    Question.find({ topic: topic, difficulty: difficulty })
        .then(question => {
            return question[random];
        })
        .catch(err => {
            console.log(err);
        });
}