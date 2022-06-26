const Topic = require('../models/topic');

exports.getAllTopics = (req, res) => {
    Topic.find()
        .then(topics => {
            res.status(200).json({
                status: "success",
                message: "Topics fetched successfully",
                data: topics
            });
        }).catch(err => {
            res.status(500).json({
                status: "error",
                message: err.message,
                data: null,
            });
        });
};