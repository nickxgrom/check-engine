const CarModel = require('../models/Car')
const ServiceError = require("../utils/ServiceError")

module.exports = {
    addCar: async (ownerId, name, isDefault) => {
        const car = await CarModel.findOne({
            where: { ownerId, name }
        })

        if (car) {
            throw new ServiceError(409, `Car '${name}' already exists`)
        }

        await CarModel.create({
            ownerId,
            name,
            isDefault
        })
    },
    updateCar: async (ownerId, name, newName) => {
        const car = await CarModel.findOne({
            where: { ownerId, name }
        })

        if (!car) {
            // TODO: throw an exception
        }
        car.name = newName
        car.save()
    },
    deleteCar: async (ownerId, name) => {
        await CarModel.destroy({
            where: { ownerId, name }
        })
    },
}