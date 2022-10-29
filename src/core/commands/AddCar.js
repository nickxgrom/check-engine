const CarService = require('../../services/CarService')

module.exports = {
    syntax: 'add-car',
    description: '',
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
        isDefault: {
          type: Boolean,
          required: false,
          default: false
        }
    },
    execute: async (options) => {
        const { ownerId, name, isDefault } = options
        await CarService.addCar(ownerId, name, isDefault)

        return `Car ${name} was added`
    }
}