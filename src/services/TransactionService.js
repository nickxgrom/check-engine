const TransactionModel = require('../models/Transaction')
const CarModel = require('../models/Car')
const ServiceError = require("../utils/ServiceError");

module.exports = {
    addTransaction: async (options) => {
        let { ownerId, name, total, cost, volume, odometerStart, odometerEnd, consumption } = options

        if (total && cost) {
            volume = (total / cost).toFixed(2)
        } else if (!volume) {
            throw new ServiceError(400, 'Total and cost or value required arguments')
        }

        let car = name ? await CarModel.findOne({ where: { ownerId, name } }) : await CarModel.findOne({ where: { ownerId, isDefault: true } })
        if (!car) {
            throw new ServiceError(400, `You have no cars. Create it with /create-car command`)
        }

        const lastTransaction = await TransactionModel.findOne({
            where: { carId: car.id },
            order: [ ['id', 'DESC'] ]
        })

        odometerStart = odometerStart || lastTransaction?.odometerEnd || 0

        if (odometerStart >= odometerEnd) {
            throw new ServiceError(400, 'OdometerStart can\'t be greater than or equal to odometerEnd')
        }

        consumption = lastTransaction ? ( (100 * lastTransaction.volume) / (odometerEnd - odometerStart) ).toFixed(2) : null

        await TransactionModel.create({
            total,
            cost,
            volume,
            odometerStart,
            odometerEnd,
            consumption,
            carId: car.id
        })

        return {
            consumption,
            volume: lastTransaction.volume,
            mileage: lastTransaction ? odometerEnd - odometerStart : null
        }
    }
}