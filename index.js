require('dotenv').config()

const app = require('express')(),
    bodyParser = require('body-parser'),
    router = require('./src/controller'),
    CommandError = require('./src/core/CommandError'),
    ServiceError = require('./src/utils/ServiceError'),
    db = require('./src/utils/db'),
    api = require('./src/utils/api')

app.use(bodyParser.json())
app.use(router)

app.use(async function(err, req, res, next) {
    if (err instanceof CommandError || err instanceof ServiceError) {
        const chatId = req.body.message.from.id
        await api.sendMessage(err.message, chatId)
        res.sendStatus(200)
    } else next(err)
})

app.listen(process.env.PORT, async () => {
    await db.sync()
    console.log(`Bot listening ${process.env.PORT}`)
})