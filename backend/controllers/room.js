require('dotenv').config();
const request = require('request');

const { getQuestion } = require('./question');
const RoomQuestion = require('../models/room_question');
const Question = require('../models/question');
const topic = require('../models/topic');
const Leaderboard = require("../models/leaderboard");

// Socket functions
const joinRoom = (io, socket) => {

    return new Promise((resolve, reject) => {
        const topic = socket.request._query['topic'];
        const difficulty = socket.request._query['difficulty'];
        
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

const compileCode = (io, socket) => {
    const code = socket.request._query['code'];
    const time = socket.request._query['time'];
    const email = socket.request._query['email'];
    const language = socket.request._query['language'];
    const version = socket.request._query['version'];
    const roomName = `${socket.data.topic}_${socket.data.difficulty}`;
    console.log(roomName);

    RoomQuestion.findOne({ roomName: roomName }).then(roomQuestion => {
        Question.findById(roomQuestion.questionID).then(question => {
            
            // Jdoodle Compiler API call here
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    "script": code,
                    "language": language,
                    "stdin": "",
                    "versionIndex": version,
                    "clientId": process.env.JDOOLDLE_CLIENT_ID,
                    "clientSecret": process.env.JDOOLDLE_CLIENT_SECRET,
                }
            };

            axios.post("https://api.jdoodle.com/v1/execute", requestOptions).then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            });

            // All test cases passed
            if (allTestCasesPassed) {
                // Determining points based on timer and difficulty
                const multiplier = (socket.data.difficulty == "no sweat") ? 1 : ((socket.data.difficulty == "think different") ? 1.5 : 2);
                const points = Math.ceil((time/20) * multiplier) + 1;
                
                // Update leaderboard
                await Leaderboard.updateOne({ email: email }, { categoryName: socket.data.topic, $inc: { points: points } }, { upsert: true });
            }
            // Emit status to client (success/failure)
        })
    })
}

const roomSocket = (io) => {
    io.on("connection", (socket) => {

        // Join room
        socket.on("joinRoom", async (callback) => {
            const question = await joinRoom(io, socket);
            console.log(question);
            callback(question);
        });

        // Start round
        socket.on("startRound", () => {
            startRound(io, socket);
        });

        // Compile Code
        socket.on("compileCode", () => {
            compileCode(io, socket);
        })

        socket.on("disconnect", (socket) => { leaveRoom(io, socket); });
    });
}

module.exports = roomSocket;