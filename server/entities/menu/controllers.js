const { fetchQuery } = require('../../utils')

const Restaurant = require('../restaurant/model')

const GET_MENU = `query {
   menu(name: "Restaurant Meal Kits") {
     id
     name
     menuCollections {
      availability
      menuCollection {
         id
         name
         categories {
            title
            products {
               id
               name
               items {
                  label
                  defaultRecipe {
                     name
                  }
                  recipes {
                     recipe {
                     id
                     name
                     assets {
                        images {
                           url
                        }
                     }
                     servings {
                        size
                        ingredients {
                           ingredient {
                              id
                              name
                           }
                        processing {
                           id
                           name {
                              id
                              title
                           }
                        }
                        sachet {
                           id
                           quantity {
                              value
                           }
                        }
                     }
                   }
                 }
               }
             }
           }
         }
       }
     }
   }
 }`

const menu = async (req, res) => {
   try {
      const { restaurantId } = req.params
      const { name, api_url } = await Restaurant.findById({ _id: restaurantId })
      const { menu } = await fetchQuery(api_url, GET_MENU)
      return res.status(200).json({ success: true, data: { name, menu } })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { menu }
