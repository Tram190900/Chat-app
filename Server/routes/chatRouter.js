const express = require("express");
const chatController = require("../app/controllers/ChatController");
const userController = require("../app/controllers/UserController");
const router = express.Router();

router.post("/", userController.userProtect, chatController.createChat);
router.get(
  "/:userId",
  userController.userProtect,
  chatController.findUserChats
);
router.get(
  "/find/:firstId/:secondId",
  userController.userProtect,
  chatController.findChat
);
router.get(
  "/find/:chatId",
  userController.userProtect,
  chatController.findChatById
);

module.exports = router;
