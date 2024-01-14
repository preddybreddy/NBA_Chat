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
    if (indexToBeDeleted !== -1) {
        return users.splice(indexToBeDeleted, 1)
    }
    return []
}

module.exports = {users: users, addToUsers, retrieveUserObj, deleteUserObj}