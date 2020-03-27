const router = require('express').Router()
const { menu } = require('./controllers')

router.route('/:restaurantId/:menuId').get(menu)

module.exports = router
