require('dotenv').config();
const request = require('request');

const { getQuestion } = require('./question');
const RoomQuestion = require('../models/room_question');
const Question = require('../models/question');
const topic = require('../models/topic');
const Leaderboard = require("../models/leaderboard");

// Socket functions
const joinRoom = (io, socket, topic_difficulty) => {

    return new Promise((resolve, reject) => {
        const topic = topic_difficulty['topic'];
        const difficulty = topic_difficulty['difficulty'];
        
        const room = `${topic}_${difficulty}`;
        
        socket.data.topic = topic;
        socket.data.difficulty = difficulty;

        socket.join(room);

        RoomQuestion.findOne({ roomName: room }).then(roomQuestion => {
            Question.findById(roomQuestion.questionID).then(question => {
                resolve(question);
            }).catch(err => {
                reject(err);
            });
        });
    });
}

const leaveRoom = (io, socket) => {
    io.use((socket, next) => {
        socket.data.topic = null;
        socket.data.difficulty = null;

        socket.leave(`${topic}_${difficulty}`);
    })
}

const startRound = async (io, socket) => {
    const roomName = `${socket.data.topic}_${socket.data.difficulty}`;
    
    const question = await getQuestion(socket.data.topic, socket.data.difficulty);
    
    await RoomQuestion.updateOne({ roomName: roomName }, { questionID: question._id, roomName: roomName }, { upsert: true });
    
    io.to(roomName).emit("newRound", question);
}

const compileCode = (io, socket, config) => {
    const code = config['code'];
    const time = config['time'];
    const email = config['email'];
    const language = config['language'];
    const version = config['version'];
    const roomName = `${socket.data.topic}_${socket.data.difficulty}`;

    RoomQuestion.findOne({ roomName: roomName }).then(roomQuestion => {
        Question.findById(roomQuestion.questionID).then(question => {
            
            // Jdoodle Compiler API call here
            var program = {
                script : code,
                language: language,
                versionIndex: version,
                stdin: question.test_cases.input,
                clientId: process.env.JDOODLE_CLIENT_ID,
                clientSecret:process.env.JDOODLE_CLIENT_SECRET
            };
            request({
                url: 'https://api.jdoodle.com/v1/execute',
                method: "POST",
                json: program
            },
            async function(error, response, body) {

                compilerOutput = response.body.output;
                expectedOutput = question.test_cases.output;

                if (compilerOutput == expectedOutput) {

                    const multiplier = (socket.data.difficulty == "no sweat") ? 1 : ((socket.data.difficulty == "think different") ? 1.5 : 2);
                    const points = Math.ceil((time/20) * multiplier) + 1;
                    
                    const regEx = new RegExp(`${socket.data.topic}|overall`, "i");
                
                    // Update leaderboard
                    await Leaderboard.updateMany(
                        { email: email, categoryName: { $regex: regEx } },
                        { email: email, categoryName: socket.data.topic, $inc: { points: points } },
                        { upsert: true }
                    );

                    // Send response event
                    io.to(roomName).emit("compileResult", {
                        status: "success",
                        message: "Correct Answer",
                        data: {
                            details: compilerOutput,
                            email: email,
                            points: points,
                        }
                    });
                }
                else
                {
                    // Send response event
                    io.to(roomName).emit("compileResult", {
                        status: "error",
                        message: "Incorrect Answer",
                        data: {
                            details: compilerOutput,
                            email: email,
                            points: 0,
                        }
                    });
                }
            });
        })
    })
}

const roomSocket = (io) => {
    io.on("connection", (socket) => {

        // Join room
        socket.on("joinRoom", async (topic_difficulty, callback) => {
            const question = await joinRoom(io, socket, topic_difficulty);
            callback(question);
        });

        // Start round
        socket.on("startRound", () => {
            startRound(io, socket);
        });

        // Compile Code
        socket.on("compileCode", (config) => {
            compileCode(io, socket, config);
        })

        socket.on("disconnect", (socket) => { leaveRoom(io, socket); });
    });
}

module.exports = roomSocket;