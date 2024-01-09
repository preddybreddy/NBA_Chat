const socketClient = io()

socketClient.emit('connection')
socketClient.on('message', (msg) => displayToChatMessages(msg))
const msgEl = document.querySelector('.chat-form-container form').msg
const chatForm = document.querySelector('#chat-form')

const queryIndex = window.location['href'].indexOf('?')
const queryString = window.location['href'].substring(queryIndex+1)
const {username, room} = Qs.parse(queryString)

function displayToChatMessages(msgObj) {
    const chatMessagesDiv = document.querySelector('.chat-messages')
    const messageDiv = document.createElement("div")
    messageDiv.classList.add('message')
    messageDiv.innerHTML = `<p class=\"meta\">${msgObj.username} <span>${msgObj.time}</span></p><p class=\"text\">${msgObj.msg}</p>`
    chatMessagesDiv.append(messageDiv)

    // scroll to latest message
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight
    // clear msg box
    msgEl.value = ''
    msgEl.focus()

}

function outputMessage(e) {
    e.preventDefault()
    socketClient.emit('client_message', {username, room, msg: msgEl.value})
}

chatForm.addEventListener('submit', (e) => outputMessage(e))
