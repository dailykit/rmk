const {
   Order,
   OrdersPerDay,
   OrdersPerRestaurant,
} = require('../entities/order/model')

const {
   getDate,
   createOrder,
   processPayment,
   groupOrdersByRestaurant,
} = require('../utils')

const process = async () => {
   try {
      const ordersPerDay = await OrdersPerDay.findOne({ date: getDate(1) })

      // change status of orders in pending list to AUTO_SKIPPED
      const pending = await ordersPerDay.orders.pending
      await Promise.all(
         pending.forEach(id => {
            Order.findByIdAndUpdate(id, {
               status: 'AUTO_SKIPPED',
            })
         })
      )

      // group selected orders by restaurant
      const ordersPerRestaurant = await new OrdersPerRestaurant({
         date: getDate(1),
      })

      const selected = await ordersPerDay.orders.selected
      ordersPerRestaurant.restaurants = await groupOrdersByRestaurant(selected)
      ordersPerRestaurant.save()

      // get list of all the restaurant
      const restaurants = await ordersPerRestaurant.restaurants

      await Promise.all(
         restaurants.map(async ({ restaurant, orders }) => {
            try {
               const result = await orders.map(orderId => {
                  processPayment(orderId, restaurant)
               })
               // send the order to jaguar
               return Promise.all(result)
            } catch (error) {
               console.log('PAYMENT_ERROR', order)
            }
         })
      )

      // Create Pending Orders
      await OrdersPerDay.create({ date: getDate(7) })

      const users = await User.find({})
      await Promise.all(
         users.map(({ userId }) => {
            createOrder(7, userId)
         })
      )
   } catch (error) {
      console.log('PROCESS_ERROR', error)
   }
}
