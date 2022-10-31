module.exports = {
    syntax: 'help',
    description: '',
    aliases: [],
    arguments: {
        ownerId: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            default: 'all'
        }
    },
    execute: async (options) => {
        const commands = Object.values(require('./index')).map(command => ({ name: command.syntax, description: command.description, args: command.arguments }))

        let resultStr = `Available commands: \n`
        commands.forEach(command => {
            if (!command.name) return
            resultStr += `*/${command.name}* - ${command.description} \n`
        })
        return resultStr
    }
}