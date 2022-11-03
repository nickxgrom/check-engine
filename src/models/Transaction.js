const db = require('../utils/db'),
    { DataTypes } = require("sequelize");

module.exports = db.define('transaction', {
    total: DataTypes.FLOAT,
    cost: DataTypes.FLOAT,
    volume: DataTypes.FLOAT,
    odometerStart: DataTypes.INTEGER,
    odometerEnd: DataTypes.INTEGER,
    consumption: DataTypes.FLOAT
}, {
    updatedAt: false
})