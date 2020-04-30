const { request } = require('graphql-request')

const Restaurant = require('../restaurant/model')

const GET_SIMPLE_RECIPE_PRODUCT = `
   query simpleRecipeProduct($id: Int!) {
      simpleRecipeProduct(id:$id) {
         simpleRecipe {
            id
            name
            author
            cookingTime
            cuisine
            description
            procedures
            assets
            simpleRecipeYields(where: {yield: {_contains: {serving: 4}}}) {
               id
               yield
               ingredientSachets {
                  ingredientSachet {
                     ingredient {
                        id
                        name
                     }
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
      const variables = { id: recipeId }
      const { simpleRecipeProduct } = await request(
         api_url,
         GET_SIMPLE_RECIPE_PRODUCT,
         variables
      )
      return res.status(200).json({ success: true, data: simpleRecipeProduct })
   } catch (error) {
      return res.json({ success: false, error: error.message })
   }
}

module.exports = { recipe }
