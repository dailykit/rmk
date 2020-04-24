const getDate = require('./getDate')
const { User } = require('../entities/user/model')
const getDefaultAddress = require('./getDefaultAddress')
const { Order, OrdersPerDay } = require('../entities/order/model')

const createOrder = async (date, userId) => {
   try {
      // const addressId = await getDefaultAddress(userId)
      const order = await Order.create({
         // addressId,
         userId: userId,
         date: getDate(date),
         deliveryDate: getDate(Number(date) + 1),
      })

      // update ordersPerDay document
      const ordersPerDay = await OrdersPerDay.findOne({ date: getDate(date) })
      ordersPerDay.orders.pending.push(order._id)
      ordersPerDay.save()

      await User.findOneAndUpdate(
         { userId },
         {
            $push: {
               orders: { date: getDate(date), details: order._id },
            },
         }
      )
   } catch (error) {
      console.log('CREATE_ORDER_ERROR', error)
   }
}

module.exports = createOrder
