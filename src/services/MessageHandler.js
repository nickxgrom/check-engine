const execute = require('../core/execute'),
    api = require('../utils/api')

function getMainInfo(body) {
    if (body.hasOwnProperty('message')) {
        return {
            senderId: body.message.from.id,
            chatId: body.message.chat.id,
            date: body.message.date,
            text: body.message.text
        }
    }
    return null
}

module.exports = {
    handleMessage: async body => {
        const messageInfo = getMainInfo(body)
        if (messageInfo && messageInfo.text.startsWith('/')) {
            const commandResult = await execute(messageInfo.senderId, messageInfo.text)
            await api.sendMessage(commandResult, messageInfo.chatId)
        }
    }
}