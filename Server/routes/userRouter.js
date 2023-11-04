const express = require('express')
const userController = require('../app/controllers/userController')
const router = express.Router()

router.post('/register', userController.register)
router.post('/login',userController.loginUser)

module.exports = router