const Restaurant = require('../entities/restaurant/model')
const { User } = require('../entities/user/model')
const { OrdersPerDay, OrdersPerRestaurant } = require('../entities/order/model')
const { createOrder, getDate, groupOrdersByRestaurant } = require('../utils')

const testOrderGroupingByRestaurant = async () => {
   try {
      /*
      // create random restaurants
      const restaurants = [
         { name: 'Dominos' },
         { name: 'Pizza Hut' },
         { name: 'Pasta Express' },
         { name: 'Burger King' },
      ]
      await restaurants.map(async ({ name }) => {
         const restaurant = await Restaurant({ name })
         restaurant.save()
      })

      // create orders by for all users
      await OrdersPerDay.create({ date: getDate(7) })

      const users = await User.find({})
      await Promise.all(
         users.map(({ userId }) => {
            createOrder(7, userId)
         })
      )
      */

      // group orders by restaurant
      const ordersPerRestaurant = await new OrdersPerRestaurant({
         date: getDate(7),
      })

      const ordersPerDay = await OrdersPerDay.findOne({ date: getDate(7) })
      const selected = await ordersPerDay.orders.selected
      ordersPerRestaurant.restaurants = await groupOrdersByRestaurant(selected)
      ordersPerRestaurant.save()
   } catch (error) {
      console.log(error)
   }
}

// testOrderGroupingByRestaurant()
