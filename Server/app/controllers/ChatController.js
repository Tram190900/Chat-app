const ChatModel = require("../model/ChatModel");
const chatModel = require("../model/ChatModel");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [firstId, secondId],
      isGroup: false,
      nameGroup: "",
    });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createGroupChat = async (req, res, next) => {
  const members = req.body.members;
  const isGroup = req.body.isGroup;
  const nameGroup = req.body.nameGroup;
  try {
    const newChat = new ChatModel({
      members: members,
      isGroup: isGroup,
      nameGroup: nameGroup
    });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await chatModel.find({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {}
};

const findChatById = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const chat = await chatModel.findById(chatId);
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createChat, findUserChats, findChat, findChatById, createGroupChat };
