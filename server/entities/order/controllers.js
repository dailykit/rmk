const { Order } = require('./model')
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
         const query = { userId }
         const update = { orders: { date, details: order._id } }
         await User.findOneAndUpdate(query, { $push: update })

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
