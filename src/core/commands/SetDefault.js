const CarService = require('../../services/CarService')

module.exports = {
    syntax: 'set-default',
    description: 'make car as default',
    aliases: [],
    arguments: {
        ownerId: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
    },
    execute: async (options) => {
        const { ownerId, name} = options
        await CarService.setDefault(ownerId, name)

        return `Car '${name}' was set as default`
    }
}