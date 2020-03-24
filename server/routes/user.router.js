const router = require('express').Router()
const controller = require('../controllers/user.controller')

router.route('/').post(controller.createUser)
router.route('/save-card').post(controller.saveCard)

module.exports = router
