const getDate = require('./getDate')
const { User } = require('../entities/user/model')
const getDefaultAddress = require('./getDefaultAddress')
const { Order, OrdersPerDay } = require('../entities/order/model')

const createOrder = async (date, userId) => {
   try {
      const addressId = await getDefaultAddress(userId)
      const order = await Order.create({
         addressId,
         userId: userId,
         date: getDate(0, date),
         deliveryDate: getDate(1, date),
      })

      // update ordersPerDay document
      const ordersPerDay = await OrdersPerDay.findOne({
         date: getDate(0, date),
      })
      if (ordersPerDay) {
         ordersPerDay.orders.pending.push(order._id)
         ordersPerDay.save()
      } else {
         await OrdersPerDay.create({
            date: getDate(0, date),
            orders: {
               pending: [order._id],
            },
         })
      }

      await User.findOneAndUpdate(
         { userId },
         {
            $push: {
               orders: { date: getDate(0, date), details: order._id },
            },
         }
      )
      return { success: true, data: order }
   } catch (error) {
      console.log('CREATE_ORDER_ERROR', error)
      return { success: false, error: error.message }
   }
}

module.exports = createOrder
