const fetch = require('isomorphic-fetch')
const Restaurant = require('./model')

const GET_BRAND = `query {
   brand {
      name
      logo
      menus {
        name
        menuId
      }
    }
}`

const fetchQuery = async (url, query) => {
   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ query }),
      })
      const { data } = await response.json()
      return data
   } catch (error) {
      console.log(error.message)
   }
}

const list = async (req, res) => {
   try {
      const list = await Restaurant.find({})
      const restaurants = await Promise.all(
         list.map(async item => {
            try {
               const { brand } = await fetchQuery(
                  process.env.DATAHUB_URI,
                  GET_BRAND
               )
               const result = await {
                  ...item._doc,
                  menu: brand.menus.find(
                     menu => menu.name === 'Restaurant Meal Kits'
                  ),
               }
               return result
            } catch (error) {
               console.log(error.message)
            }
         })
      )
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
