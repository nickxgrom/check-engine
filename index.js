const app = require('express')(),
    bodyParser = require('body-parser'),
    router = require('./src/controller'),
    CommandError = require("./src/core/CommandError"),
    db = require('./src/utils/db')

require('dotenv').config()

app.use(bodyParser.json())
app.use(router)

app.use(async function(err, req, res, next) {
    if (err instanceof CommandError) {
        console.log(err.message)
        res.sendStatus(200)
    } else next(err)
})

app.listen(process.env.PORT, async () => {
    await db.sync()
    console.log(`Bot listening ${process.env.PORT}`)
})