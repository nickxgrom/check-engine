const CarService = require('../../services/CarService')

module.exports = {
    syntax: 'update-name',
    description: 'updating car name',
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
        newName: {
            type: String,
            required: true
        }
    },
    execute: async (options) => {
        const { ownerId, name, newName } = options
        await CarService.updateCarName(ownerId, name, newName)

        return `Car '${name}' is renamed to '${newName}'`
    }
}