const { Sequelize } = require('sequelize')

module.exports = new Sequelize(process.env.DB_URI, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
})

