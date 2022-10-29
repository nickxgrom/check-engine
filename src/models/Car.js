const { DataTypes } = require('sequelize'),
    db = require('../utils/db')

module.exports = db.define('car', {
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN
})