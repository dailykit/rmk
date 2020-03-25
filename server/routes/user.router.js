const router = require('express').Router()
const controller = require('../controllers/user.controller')

router.route('/signup').post(controller.signup)
router.route('/save-card').post(controller.saveCard)

module.exports = router
