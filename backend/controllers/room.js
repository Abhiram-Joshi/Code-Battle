const { getQuestion } = require('./question');
const RoomQuestion = require('../models/room_question');
const topic = require('../models/topic');

// Socket functions
const joinRoom = async (io, socket, callback) => {
    const topic = socket.request._query['topic'];
    const difficulty = socket.request._query['difficulty'];
    
    const room = `${topic}_${difficulty}`;
    
    socket.data.topic = topic;
    socket.data.difficulty = difficulty;

    socket.join(room);

    const questionID = await RoomQuestion.findOne({ roomName: room }).questionID;
    const question = await Question.findOne({ _id: questionID });

    callback(question);
}

const leaveRoom = (io, socket) => {
    io.use((socket, next) => {
        socket.data.topic = null;
        socket.data.difficulty = null;

        socket.leave(`${topic}_${difficulty}`);
    })
}

const startRound = async (socket, io) => {
    const roomName = `${socket.data.topic}_${socket.data.difficulty}`;
    
    const question = await getQuestion(socket.data.topic, socket.data.difficulty);
    
    await RoomQuestion.updateOne({ roomName: roomName }, { questionID: question._id, roomName: roomName }, { upsert: true });
    
    io.to(roomName).emit("newRound", question);
}

const roomSocket = (io) => {
    io.on("connection", (socket) => {

        // Join room
        socket.on("joinRoom", () => {
            joinRoom(io, socket, callback);
        });

        // Start round
        socket.on("startRound", () => {
            startRound(socket, io);
        });

        socket.on("disconnect", (socket) => { leaveRoom(io, socket); });
    });
}

module.exports = roomSocket;