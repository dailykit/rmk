const Restaurant = require('./model')

const list = async (req, res) => {
   try {
      const { zip } = req.params
      const restaurants = await Restaurant.find({ zipcodes: zip }, 'menu name')
      return res.json({ success: true, data: restaurants })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

const create = async (req, res) => {
   try {
      const restaurant = await Restaurant.create(req.body)
      return res.status(200).json({ success: true, data: restaurant })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { list, create }
