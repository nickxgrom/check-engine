const MessageHandler = require("./services/MessageHandler"),
    router = require('express').Router(),
    catchError = require('./utils/catchError')

router.post('/', catchError(async (req, res, next) => {
    await MessageHandler.handleMessage(req.body)
    res.status(200)
}))

module.exports = router