const router = require('express').Router()
const { menu } = require('./controllers')

router.route('/:restaurantId').get(menu)

module.exports = router
