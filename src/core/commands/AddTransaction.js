const TransactionService = require("../../services/TransactionService");

module.exports = {
    syntax: 'add-transaction',
    description: 'add a fuel consumption record',
    aliases: [],
    arguments: {
        ownerId: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            default: null
        },
        total: {
            type: Number,
            default: null
        },
        cost: {
            type: Number,
            default: null
        },
        volume: {
            type: Number,
            default: null
        },
        odometerStart: {
            type: Number,
            default: null
        },
        odometerEnd: {
            type: Number,
            required: true
        },
    },
    execute: async (options) => {
        const { consumption, volume, mileage } = await TransactionService.addTransaction(options)

        return `You drove *${mileage}km* with *${volume} liters* of fuel:\nConsumption per 100km: *${consumption} liters*`
    }
}