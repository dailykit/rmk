const { fetchQuery } = require('../../utils')

const Restaurant = require('./model')

const GET_BRAND = `query {
   brand {
      name
      logo
      menus {
        name
        menuId
        zipcode
      }
    }
}`

const list = async (req, res) => {
   try {
      const { zip } = req.params
      const restaurants = await Restaurant.find({
         'menu.zip_codes': Number(zip),
      })
      return res.json({ success: true, data: restaurants })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
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
