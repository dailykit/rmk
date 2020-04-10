const { Order, OrdersPerDay } = require('./model')
const { User } = require('../user/model')

module.exports = {
   create: async (req, res) => {
      const { date, userId, addressId, restaurant } = req.body
      try {
         // Create an order
         const order = await Order.create({
            date,
            userId,
            addressId,
            restaurant,
            info: [],
         })

         // Push order into user's orders list
         const userQuery = { userId }
         const userUpdate = { orders: { date, details: order._id } }
         await User.findOneAndUpdate(userQuery, { $push: userUpdate })

         // Push order into OrdersPerDay's order's list
         const orderPerDay = await OrdersPerDay.findOne({ date })
         if (orderPerDay) {
            await orderPerDay.orders.pending.push(order._id)
            await orderPerDay.save()
         } else {
            await OrdersPerDay.create({
               date,
               orders: { pending: [order._id] },
            })
         }

         return res.json({
            data: order,
            success: true,
            message: 'Order create successfully!',
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
