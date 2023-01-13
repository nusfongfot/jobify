const authController = require('../controllers/authController')
const express = require('express')
const router = express.Router()

router.route('/register').post(authController.register)
router.route('/login').post(authController.login)
router.route('/updateUser').patch(authController.updateUser)

module.exports = router