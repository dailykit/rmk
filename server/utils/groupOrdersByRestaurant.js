const { Order } = require('../entities/order/model')

const groupOrdersByRestaurant = async orders => {
   try {
      const restaurants = []
      await Promise.all(
         orders.map(async id => {
            const order = await Order.findOne({ _id: id })
            const index = restaurants.findIndex(
               ({ restaurant }) => restaurant === order.restaurant.id
            )
            if (index === -1) {
               restaurants.push({
                  orders: [id],
                  restaurant: order.restaurant.id,
               })
            } else {
               const restaurant = restaurants[index]
               restaurants[index] = {
                  ...restaurant,
                  orders: [...restaurant.orders, id],
               }
            }
         })
      )
      return restaurants
   } catch (error) {
      console.log(error)
   }
}

module.exports = groupOrdersByRestaurant
