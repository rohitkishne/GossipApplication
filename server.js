const express = require('express');
const { disconnect } = require('process');

const app = express();

const server = require('http').Server(app);

app.use(express.static('public'));

const io = require('socket.io')(server);

io.on('connection',(socket) => {
    console.log("connection established", socket.id);

    socket.on('message', data =>{
        io.emit('message', data)
    })

    socket.on('disconnect',() =>{
        console.log(socket.id, 'is left')
    })
})

const PORT = 9000;

server.listen(PORT, () => {
    console.log("my server is running on port", PORT);
})