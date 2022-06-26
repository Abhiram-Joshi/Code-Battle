const Question = require('../models/question');
const Topic = require('../models/topic');

exports.getQuestion = (topic, difficulty) => {
    return new Promise((resolve, reject) => {
        Topic.findOne({ name: topic }).then(topic => {
            const topicID = topic._id;
            console.log(topicID);
            var random;
            Question.countDocuments({ topic: topicID, difficulty: difficulty }).then( count => {
                random = Math.floor(Math.random() * count);
                Question.find({ topic: topicID, difficulty: difficulty })
                .then(question => {
                    resolve(question[random]);
                })
                .catch(err => {
                    reject(err);
                });
            });
        });
    });
}