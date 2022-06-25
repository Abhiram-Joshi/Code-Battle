const { getQuestion } = require('./question');

// Socket functions
const joinRoom = (socket) => {
    io.use((socket, next) => {
        const topic = socket.request._query['topic'];
        const difficulty = socket.request._query['difficulty'];

        const room = `${topic}_${difficulty}`;

        socket.data.topic = topic;
        socket.data.difficulty = difficulty;

        socket.join(room);
    })
}

const leaveRoom = (socket) => {
    io.use((socket, next) => {
        socket.data.topic = null;
        socket.data.difficulty = null;

        socket.leave(`${topic}_${difficulty}`);
    })
}

const startRound = (socket) => {
    getQuestion(socket.data.topic, socket.data.difficulty);
}

const roomSocket = (io) => {
    io.on("connection", (socket) => {
        // Join room
        joinRoom(socket);

        socket.on("disconnect", (socket) => { leaveRoom(socket); });
    });
}

module.exports = roomSocket;