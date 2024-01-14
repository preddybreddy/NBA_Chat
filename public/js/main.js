
const socketClient = io()


const msgEl = document.querySelector('.chat-form-container form').msg
const chatForm = document.querySelector('#chat-form')
const roomNameSpace = document.querySelector('#room-name')
const usersTag = document.querySelector('#users')
const roomMap = new Map()
roomMap.set('lakers', 'L.A Lakers')
roomMap.set('magic', 'Orlando Magic')
roomMap.set('blazers', 'Portland Trailblazers')
roomMap.set('clippers', 'L.A Clippers')
roomMap.set('state', 'Golden State Warriors')

const leaveRoomBtn = document.querySelector('#leave-btn')

const queryIndex = window.location['href'].indexOf('?')
const queryString = window.location['href'].substring(queryIndex+1)
const {username, room} = Qs.parse(queryString)
roomNameSpace.textContent = roomMap.get(room)
socketClient.emit('connection')
socketClient.emit('joinRoom', {username, room})
socketClient.on('message', (msg) => displayToChatMessages(msg))
function displayToChatMessages(msgObj) {
    const chatMessagesDiv = document.querySelector('.chat-messages')
    const messageDiv = document.createElement("div")
    messageDiv.classList.add('message')
    messageDiv.innerHTML = `<p class=\"meta\">${msgObj.username} <span>${msgObj.time}</span></p><p class=\"text\">${msgObj.msg}</p>`
    chatMessagesDiv.append(messageDiv)

    // scroll to latest message
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight
 

}

function outputMessage(e) {
    e.preventDefault()
    socketClient.emit('client_message', {username, room, msg: msgEl.value})
    // clear msg box
    msgEl.value = ''
    msgEl.focus()
}

chatForm.addEventListener('submit', (e) => outputMessage(e))

function displayUsers(userList) {
    const listElements = userList.map(user => `<li>${user.username}</li>`)
    let stringListElements = ''
    for (let i = 0; i < listElements.length; i++) {
        stringListElements += listElements[i]
    }
    usersTag.innerHTML = stringListElements
}
socketClient.on('updateSidebar', (usersList) => displayUsers(usersList))

leaveRoomBtn.addEventListener('click', () => {
    const response = confirm('Are you sure you want to leave the chat room?')
    if (response) {
        window.location['href'] = '/index.html'
    }else {

    }
})