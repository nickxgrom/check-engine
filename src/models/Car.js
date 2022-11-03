const { DataTypes } = require('sequelize'),
    db = require('../utils/db'),
    Transaction = require('./Transaction')

const Car = db.define('car', {
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN
})

Car.hasMany(Transaction)

module.exports = Car

