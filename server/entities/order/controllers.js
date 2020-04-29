const { Order, OrdersPerDay } = require('./model')
const { createOrder, getDate } = require('../../utils')

module.exports = {
   create: async (req, res) => {
      const { timestamp, userId } = req.body
      try {
         const dates = []
         if (new Date(timestamp).getHours() < 16) {
            for (let i = 1; i <= 7; i++) {
               dates.push(timestamp + 86400000 * i)
            }
         } else {
            for (let i = 2; i <= 8; i++) {
               dates.push(timestamp + 86400000 * i)
            }
         }
         const orders = await Promise.all(
            dates.map(date => {
               return createOrder(date, userId)
            })
         )
         return res.json({
            data: orders,
            success: true,
            message: 'orders created successfully',
         })
      } catch (error) {
         return res.json({ success: false, error: error.message })
      }
   },
   update: async (req, res) => {
      try {
         const { id } = req.params
         const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
         })

         const orderPerDay = await OrdersPerDay.findOne({ date: order.date })
         if (order.status === 'SELECTED') {
            orderPerDay.orders.selected.push(order._id)
            orderPerDay.orders.pending.pull(order._id)
            orderPerDay.save()
         } else if (order.status === 'SKIPPED') {
            orderPerDay.orders.selected.pull(order._id)
            orderPerDay.orders.pending.pull(order._id)
            orderPerDay.save()
         }

         return res.json({
            data: order,
            success: true,
            message: 'Order updated succesfully',
         })
      } catch (error) {
         return res.json({ success: false, error: error.message })
      }
   },
   order: async (req, res) => {
      try {
         const order = await Order.findOne(req.query)
         return res.json({
            data: order,
            success: true,
            message: 'Successfully fetched the order!',
         })
      } catch (error) {
         return res.json({ success: false, error: error.message })
      }
   },
}
