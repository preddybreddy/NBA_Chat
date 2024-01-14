const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')
const {formatMessage} = require('./utils/messages')
const {users, addToUsers, retrieveUserObj, deleteUserObj} = require('./utils/users')
const {roomMap} = require('./utils/roomMapping')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {
    console.log('A new WS connection')
    socket.on('joinRoom', (userObj) => {
        userObj['socketid'] = socket.id
        addToUsers(userObj)
        // Add the user to the room
        socket.join(userObj.room)
        // Welcome message
        socket.emit('message', formatMessage(`Welcome to ${roomMap.get(userObj.room)} chatroom`, 'Chatbot'))
        socket.broadcast.to(userObj.room).emit('message', formatMessage('A new user has joined the chat', 'Chatbot'))
    })
    socket.on('client_message', (msg_obj) => {
        const {username, room, msg} = msg_obj
        msg_obj_with_time = formatMessage(msg, username)
        io.to(msg_obj.room).emit('message', msg_obj_with_time)
    })
    //console.log(users)
    socket.on('disconnect', () => {
        const user = deleteUserObj(socket.id)
        if (user.length > 0) {
            io.to(user[0].room).emit('message', formatMessage('A user has left the chat', 'Chatbot'))
        }
    })
})

app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))