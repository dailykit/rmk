const { Order, OrdersPerDay } = require('./model')
const { User } = require('../user/model')

module.exports = {
   create: async (req, res) => {
      const {
         date,
         userId,
         addressId,
         restaurant,
         productId,
         lunch,
         dinner,
      } = req.body
      try {
         // Create an order
         const order = await Order.create({
            date,
            userId,
            addressId,
            restaurant,
            info: [
               {
                  productId,
                  items: [lunch, dinner],
               },
            ],
         })

         // Push order into user's orders list
         const userQuery = { userId }
         const userUpdate = { orders: { date, details: order._id } }
         await User.findOneAndUpdate(userQuery, { $push: userUpdate })

         // Push order into OrdersPerDay's order's list
         const orderPerDay = await OrdersPerDay.findOne({ date })
         if (orderPerDay) {
            await orderPerDay.orders.push(order._id)
            await orderPerDay.save()
         } else {
            await OrdersPerDay.create({ date, orders: [order._id] })
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
}
