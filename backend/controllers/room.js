const { getQuestion } = require('./question');
const RoomQuestion = require('../models/room_question');
const Question = require('../models/question');
const topic = require('../models/topic');

// Socket functions
const joinRoom = (io, socket, callback) => {
    const topic = socket.request._query['topic'];
    const difficulty = socket.request._query['difficulty'];
    
    const room = `${topic}_${difficulty}`;
    
    socket.data.topic = topic;
    socket.data.difficulty = difficulty;

    socket.join(room);

    RoomQuestion.findOne({ roomName: room }).then(roomQuestion => {
        Question.findById(roomQuestion.questionID).then(question => {
            console.log(callback(question));
        })
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
    const roomName = `${socket.data.topic}_${socket.data.difficulty}`;

    RoomQuestion.findOne({ roomName: room }).then(roomQuestion => {
        Question.findById(roomQuestion.questionID).then(question => {
            // Jdoodle Compiler API call here
            

            // All test cases passed
            User.findOne({ email: email }).then(user => {
                // Increase users points here based on time taken

            })

            // Emit status to client (success/failure)

        })
    })
}

const roomSocket = (io) => {
    io.on("connection", (socket) => {

        // Join room
        socket.on("joinRoom", (callback) => {
            joinRoom(io, socket, callback);
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