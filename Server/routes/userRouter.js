const express = require('express')
const userController = require('../app/controllers/userController')
const router = express.Router()

router.post('/register',userController.register)
router.post('/login', userController.loginUser)
router.get('/find/:userId', userController.userProtect ,userController.findUser)
router.get('/:userId/friends', userController.userProtect ,userController.getFriends)
router.get('/findByName/:name', userController.userProtect, userController.findUserByName)

module.exports = router