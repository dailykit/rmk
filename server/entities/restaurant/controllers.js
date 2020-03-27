const Restaurant = require('./model')

const list = async (req, res) => {
   const restaurants = await Restaurant.find({})
   return res.json({ success: true, data: restaurants })
}

const create = async (req, res) => {
   try {
      const { name, logo } = req.body
      const restaurant = await Restaurant.create({
         name: name.trim(),
         ...(logo && { logo }),
      })
      return res.status(200).json({ success: true, data: restaurant })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { list, create }
