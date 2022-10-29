const CarModel = require('../models/Car')

module.exports = {
    addCar: async (ownerId, name, isDefault) => {
        // TODO: check by name, if owner has no car with same name
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