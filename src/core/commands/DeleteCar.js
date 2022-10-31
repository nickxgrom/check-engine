const CarService = require('../../services/CarService')

module.exports = {
    syntax: 'delete-car',
    description: 'deleting car by name',
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
        const { ownerId, name } = options
        await CarService.deleteCar(ownerId, name)

        return `Car '${name}' was deleted`
    }
}