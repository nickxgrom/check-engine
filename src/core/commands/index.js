const ping = require('./ping'),
    help = require('./help'),
    AddCar = require('./AddCar'),
    CarList = require('./CarList'),
    SetDefault = require('./SetDefault'),
    UpdateName = require('./UpdateName'),
    DeleteCar = require('./DeleteCar'),
    AddTransaction = require('./AddTransaction')

module.exports = {
    ping,
    AddCar,
    CarList,
    SetDefault,
    UpdateName,
    DeleteCar,
    help,
    AddTransaction,
}