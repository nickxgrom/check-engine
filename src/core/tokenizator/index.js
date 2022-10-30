function getCommand(message) {
    const tokens = message.trim().split(/\s+/)
    const token = tokens.splice(0, 1)[0].replace('/', '')

    return {
        token,
        arguments: tokens.length ? tokens : []
    }
}

module.exports = getCommand