const { request } = require('graphql-request')

const Restaurant = require('../restaurant/model')

const GET_RECIPE = `
   query simpleRecipe($id: Int) {
      simpleRecipe(id:$id) {
      id
      name
      author
      cookingTime
      cuisine
      description
      procedures
      simpleRecipeYields(where: {yield: {_contains: {serving: 4}}}) {
         id
         yield
         ingredientSachets {
            ingredientSachet {
            ingredient {
               name
            }
            }
         }
      }
      }
   }

`

const recipe = async (req, res) => {
   try {
      const { restId, recipeId } = req.params

      const { api_url } = await Restaurant.findById({ _id: restId })
      const { simpleRecipe } = await request(api_url, GET_RECIPE, {
         id: recipeId,
      })
      return res.status(200).json({ success: true, data: simpleRecipe })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { recipe }
