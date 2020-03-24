const router = require('express').Router()
const controller = require('../controllers/user.controller')

router.route('/').post(controller.createUser)
router.route('/init-payment').post(controller.createIntent)

module.exports = router
