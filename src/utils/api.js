const axios = require('axios'),
    baseUrl = 'https://api.telegram.org'

module.exports = {
    sendMessage: async (message, chatId) => {
        await axios.post(`${baseUrl}/${process.env.BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: message
        })
    }
}