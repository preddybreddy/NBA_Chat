const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')
const moment = require('moment')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {
    console.log('A new WS connection')
    socket.broadcast.emit('message', 'A new user has joined the chat')
    socket.on('client_message', (msg_obj) => {
        const {username, room, msg} = msg_obj
        msg_obj_with_time = {username, room, msg, time: moment().format('h:mm a')}
        io.emit('message', msg_obj_with_time)
    })
    socket.on('message', (msg) => console.log(msg))

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })
})

app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))