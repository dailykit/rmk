const { User } = require('./model')
const { Order } = require('../order/model')

const create = async (req, res) => {
   try {
      const { id } = req.body
      const user = await User.create({ userId: id })
      return res.json({
         user,
         success: true,
         message: 'Succesfully created the user!',
      })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

const user = async (req, res) => {
   try {
      const { id } = req.params
      const user = await User.create({ userId: id })
      return res.json({
         user,
         success: true,
         message: 'Succesfully fetched the user!',
      })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

const orders = async (req, res) => {
   try {
      const { id } = req.params
      const { orders } = await User.findOne({ userId: id })

      const latestOrders =
         orders.sort((a, b) => new Date(b.date) - new Date(a.date)).length > 10
            ? orders.slice(-10)
            : orders

      const populated = await Promise.all(
         latestOrders.map(async order => {
            const details = await (
               await Order.findById(order.details)
            ).toObject()
            return { ...order.toObject(), details: details }
         })
      )

      return res.json({
         data: populated,
         success: true,
         message: 'Succesfully fetched the user!',
      })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { create, user, orders }
