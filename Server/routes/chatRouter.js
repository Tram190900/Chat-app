const express = require('express')
const chatController = require('../app/controllers/ChatController')
const router = express.Router()

router.post('/', chatController.createChat)
router.get('/:userId',chatController.findUerChats)
router.get('/find/:firstId/:secondId', chatController.findChat)

module.exports = router