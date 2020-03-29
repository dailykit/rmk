const { fetchQuery } = require('../../utils')

const Restaurant = require('../restaurant/model')

const GET_RECIPE = `query recipe($id: ID!){
   recipe(id: $id) {
      name
      servings {
        size
        ingredients {
          ingredient {
            id
            name
          }
          processing {
            name {
              title
            }
          }
          sachet {
            quantity {
              value
            }
          }
        }
      }
      procedures {
         name
         steps {
            title
            description
         }
      }
   }
 }`

const recipe = async (req, res) => {
   try {
      const { restId, recipeId } = req.params
      const { api_url } = await Restaurant.findById({ _id: restId })
      const { recipe } = await fetchQuery(api_url, GET_RECIPE, { id: recipeId })
      return res.status(200).json({ success: true, data: recipe })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { recipe }
