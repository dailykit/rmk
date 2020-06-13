const getDate = require('./getDate')
const getToday = require('./getToday')
const fetchApi = require('./fetchApi')
const createOrder = require('./createOrder')
const processPayment = require('./processPayment')
const getDefaultAddress = require('./getDefaultAddress')
const groupOrdersByRestaurant = require('./groupOrdersByRestaurant')

module.exports = {
   getDate,
   getToday,
   fetchApi,
   createOrder,
   processPayment,
   getDefaultAddress,
   groupOrdersByRestaurant,
}
