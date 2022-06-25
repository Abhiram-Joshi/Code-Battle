

// Socket functions
const joinRoom = (socket) => {
    io.use((socket, next) => {
        const topic = socket.request._query['topic'];
        const difficulty = socket.request._query['difficulty'];

        const room = `${topic}_${difficulty}`;

        socket.join(room);
    })
}

const getQuestion = (socket) => {
    
}

const roomSocket = (io) => {
    io.on("connection", (socket) => {
        // Join room
        joinRoom(socket);
    })
}

module.exports = roomSocket;