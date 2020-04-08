const router = require('express').Router()
const { create } = require('./controllers')

router.route('/').post(create)

module.exports = router
