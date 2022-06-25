const Question = require('../models/question');

exports.getQuestion = (topic, difficulty) => {
    return new Promise((resolve, reject) => {
        var random;
        Question.countDocuments({ topic: topic, difficulty: difficulty }, (err, count) => {
            random = Math.floor(Math.random() * count);
        });

        // await Question.find({ topic: topic, difficulty: difficulty })
        Question.find({ topic: topic, difficulty: difficulty })
            .then(question => {
                resolve(question[random]);
            })
            .catch(err => {
                console.log(err);
            });
    });
    // return question;
}