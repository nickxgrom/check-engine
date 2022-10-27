const commands = require('./commands'),
    CommandError = require('./CommandError'),
    getCommand = require('./tokenizator')

module.exports = async function (message, date) {
    const { token, arguments } = getCommand(message)

    const command = Object.values(commands).find(command => command.syntax === token)

    if (!command) {
        throw new CommandError(404, 'Unknown command')
    }

    const requiredParametersLength = command.arguments.filter(arg => arg.required === true)
    if (requiredParametersLength > (arguments ? arguments.length : 0)) {
        throw new CommandError(400, `Command do not match parameters. Command must contain ${requiredParametersLength} arguments`)
    }

    return command.execute(arguments, date)
}