const CarService = require('../../services/CarService')

module.exports = {
    syntax: 'car-list',
    description: 'returns a list of cars',
    aliases: [],
    arguments: {
        ownerId: {
            type: Number,
            required: true
        },
    },
    execute: async (options) => {
        const { ownerId } = options
        const cars = await CarService.getCarList(ownerId)

        let resultStr = cars.length ? 'Yours cars: \n' : 'You have no cars. Use \'/add-car\' to create it.'

        cars.forEach(( car, index) => {
            resultStr += `${index+1}. ${car.name} ${car.isDefault ? '(set as default)' : ''} \n`
        })

        return resultStr
    }
}