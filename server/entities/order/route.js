const router = require('express').Router()
const { create, order } = require('./controllers')

router.route('/').post(create)
router.route('/').get(order)

module.exports = router
