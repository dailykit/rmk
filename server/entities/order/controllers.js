const { Order } = require('./model')

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
