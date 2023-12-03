const express = require('express')
const chatController = require('../app/controllers/ChatController')
const router = express.Router()

router.post('/', chatController.createChat)
router.get('/:userId',chatController.findUserChats)
router.get('/find/:firstId/:secondId', chatController.findChat)
router.get('/find/:chatId',chatController.findChatById)

module.exports = router