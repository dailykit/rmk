const router = require('express').Router()
const { recipe } = require('./controllers')

router.route('/:restId/:recipeId').get(recipe)

module.exports = router
