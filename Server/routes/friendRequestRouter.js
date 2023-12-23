const express = require("express");
const userController = require("../app/controllers/UserController");
const friendRequestController = require('../app/controllers/FriendRequestController')
const router = express.Router();

router.post("/", userController.userProtect, friendRequestController.sendFriendRequest)
router.get('/findByRecipient/:recipientId', userController.userProtect, friendRequestController.getFriendRequestByRecipient)

module.exports = router;