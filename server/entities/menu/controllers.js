const { fetchQuery } = require('../../utils')

const Restaurant = require('../restaurant/model')

const GET_MENU = `query {
   menu(name: "Restaurant Meal Kits") {
     name
     menuCollections {
       availability
       menuCollection {
         name
         categories {
           title
           products {
             name
             items {
               label
               defaultRecipe {
                  name
               }
               recipes {
                 recipe {
                   name
                   servings {
                     size
                      ingredients {
                       ingredient {
                         name
                       }
                       processing {
                         processingName {
                           name
                         }
                         sachets {
                           quantity {
                             value
                           }
                         }
                       }
                       sachet {
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
      const { api_url } = await Restaurant.findById({ _id: restaurantId })
      const data = await fetchQuery(api_url, GET_MENU)
      return res.status(200).json({ success: true, data })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { menu }
