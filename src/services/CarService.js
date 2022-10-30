const CarModel = require('../models/Car')
const ServiceError = require("../utils/ServiceError")

module.exports = {
    getCarList: async (ownerId) => {
        const cars = await CarModel.findAll({
          where: { ownerId }
        })
        return cars.map(car => ({ name: car.name, isDefault: car.isDefault }))
    },
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
    setDefault: async (ownerId, name) => {
        const car = await CarModel.findOne({
            where: { ownerId, name }
        })

        if (!car) {
            throw new ServiceError(404, `Car '${name}' doesn't exist`)
        }

        const cars = await CarModel.findAll({ where: { ownerId } })
        cars.forEach(item => {
            item.isDefault = false
            item.save()
        })

        car.isDefault = true
        car.save()
    } ,
    deleteCar: async (ownerId, name) => {
        await CarModel.destroy({
            where: { ownerId, name }
        })
    },
}