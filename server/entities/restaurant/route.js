const router = require('express').Router()
const { list, create } = require('./controllers')

router.route('/').get(list)
router.route('/').post(create)

module.exports = router
