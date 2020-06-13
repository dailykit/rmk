const fetchApi = require('./fetchApi')
const getDate = require('./getDate')
const { Order, FailedOrder } = require('../entities/order/model')

const processPayment = async (orderId, restuarant) => {
   try {
      const order = await Order.findById(orderId)
      if (order.payment.status === 'PENDING') {
         const response = await fetchApi(
            `${process.env.DAILYKEY_URI}/api/charge`,
            {
               orderId: order._id,
               amount: order.billing.total,
               customer: {
                  cardId: order.cardId,
                  stripeId: order.stripeId,
               },
               restaurant: {
                  stripeId: order.restaurant.stripeId,
               },
            }
         )
         if (response.success) {
            // update order's payment status
            order.payment.id = response.data.id
            order.payment.status = 'SUCCESS'
            order.save()

            // send orders to restaurant
            const { api_url } = await restaurant.findById(order.restaurant.id)
            const { success } = await fetchApi(
               `${new URL(api_url).hostname}:4003/api/orders`,
               order.info
            )
            if (success) {
               order.status = 'ORDER_CONFIRMED'
               order.save()
            } else {
               order.status = 'ORDER_FAILED'
               order.save()

               // push order to failed orders list
               await FailedOrder.findByIdAndUpdate(
                  { date: getDate(1) },
                  {
                     date: getDate(1),
                     $push: {
                        orders: order._id,
                     },
                  },
                  { upsert: true }
               )
            }
         } else {
            order.payment.status = 'ERROR'
            order.save()

            // push order to failed orders list
            await FailedOrder.findByIdAndUpdate(
               { date: getDate(1) },
               {
                  date: getDate(1),
                  $push: {
                     orders: order._id,
                  },
               },
               { upsert: true }
            )
         }
      }
   } catch (error) {
      console.log(error)
   }
}

module.exports = processPayment
