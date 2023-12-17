const express = require('express')
const messageController = require('../app/controllers/MessageController')
const userController = require('../app/controllers/UserController')
const router = express.Router()

router.post('/', userController.userProtect,messageController.createMessage)
router.get('/:chatId',userController.userProtect,messageController.getMessage)

module.exports = router