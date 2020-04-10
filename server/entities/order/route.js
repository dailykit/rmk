const router = require('express').Router()
const { create, update, order } = require('./controllers')

router.route('/').post(create)
router.route('/:id').patch(update)
router.route('/').get(order)

module.exports = router
