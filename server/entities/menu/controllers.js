const { request } = require('graphql-request')

const Restaurant = require('../restaurant/model')

const GET_MENU = `
   query MyQuery {
      comboProducts(where: {name: {_eq: "Restaurant Meal Kit"}}) {
         id
         name
         comboProductComponents {
            id
            label
            customizableProduct {
               id
               default
               customizableProductOptions {
                  id
                  simpleRecipeProduct {
                     id
                     simpleRecipe {
                        id
                        name
                        assets
                        simpleRecipeYields(where: {yield: {_contains: {serving: 4}}}) {
                           ingredientSachets {
                              ingredientSachet {
                                 ingredient {
                                    name
                                 }
                                 ingredientProcessing {
                                    processing {
                                       name
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
`

const menu = async (req, res) => {
   try {
      const { restaurantId } = req.params

      const { name, api_url } = await Restaurant.findById({ _id: restaurantId })
      const { comboProducts } = await request(api_url, GET_MENU)

      return res.status(200).json({
         success: true,
         data: { name, menu: comboProducts[0] },
      })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { menu }
