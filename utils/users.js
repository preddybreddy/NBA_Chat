const users = []

function addToUsers(msgObj) {
    users.push(msgObj)
    return msgObj
}

function retrieveUserObj(socketId) {
   return users.find(user => user.socketid === socketId)
}

function deleteUserObj(socketId) {
    const indexToBeDeleted = users.findIndex(user => user.socketid === socketId)
    return users.splice(indexToBeDeleted, 1)
}

module.exports = {users: users, addToUsers, retrieveUserObj, deleteUserObj}