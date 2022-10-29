const commands = require('./commands'),
    CommandError = require('./CommandError'),
    getCommand = require('./tokenizator')

module.exports = async function (senderId, message) {
    const { token, arguments } = getCommand(message)

    const command = Object.values(commands).find(command => command.syntax === token)

    if (!command) {
        throw new CommandError(404, 'Unknown command')
    }

    const options = {},
        commandArgs = command.arguments

    arguments.forEach(arg => {
        const [key, value] = arg.split('=')
        options[key] = value
    })
    options.ownerId = senderId

    Object.keys(commandArgs).forEach(key => {
        if (options.hasOwnProperty(key)) {
            if (commandArgs[key].type === Boolean) {
                if (options[key] !== undefined) {
                    throw new CommandError(400, `Argument '${key}' is a flag`)
                }
                options[key] = true
            } else if (!options[key]) {
                throw new CommandError(400, `Argument '${key}' must have value`)
            } else if (commandArgs[key].type === Number) {
                options[key] = +options[key]
            }
        } else if (commandArgs[key].required && !options[key]) {
            throw new CommandError(400, `Argument '${key}' is required`)
        } else {
            options[key] = commandArgs[key].default
        }
    })

    return command.execute(options)
}