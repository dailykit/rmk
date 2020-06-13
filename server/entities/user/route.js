const router = require('express').Router()
const { create, user, orders } = require('./controllers')

router.route('/').post(create)
router.route('/:id').get(user)
router.route('/:id/orders').get(orders)

module.exports = router
