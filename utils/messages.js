const moment = require('moment')

function formatMessage(msgBody, username) {
    return {username, msg: msgBody, time: moment().format('h:mm a')}
}

module.exports = {formatMessage}