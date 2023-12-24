const FriendRequestModel = require("../model/FriendRequestModel");
const UserModel = require("../model/userModel");

const sendFriendRequest = async (req, res, next) => {
  const { sender, recipient } = req.body;
  try {
    const friendRequest = await FriendRequestModel.findOne({
      sender: sender,
      recipient: recipient,
    });
    if (friendRequest)
      return res
        .status(200)
        .json(
          await FriendRequestModel.populate(friendRequest, {
            path: "sender recipient",
            select: "_id name",
          })
        );

    const newRequest = new FriendRequestModel({
      sender,
      recipient,
      stateAccept: false,
    });
    const response = await newRequest.save();
    res
      .status(200)
      .json(
        await FriendRequestModel.populate(response, {
          path: "sender recipient",
          select: "_id name",
        })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getFriendRequestByRecipient = async (req, res, next) => {
  const recipientId = req.params.recipientId;
  try {
    const response = await FriendRequestModel.find({
      recipient: recipientId,
      stateAccept: false,
    }).populate("sender recipient", "_id name");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getFriendRequestBySender = async (req, res, next) => {
  const senderId = req.params.senderId;
  try {
    const response = await FriendRequestModel.find({
      sender: senderId,
      stateAccept: false,
    }).populate("sender recipient", "_id name");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const acceptRequest = async (req, res, next) => {
  const requestId = req.params.requestId;
  try {
    const response = await FriendRequestModel.findByIdAndUpdate(
      { _id: requestId },
      { stateAccept: true }
    );
    const populateRequest = await FriendRequestModel.populate(response, {
      path: "sender recipient",
      select: "_id name",
    })
    const sender = await UserModel.findById(populateRequest.sender._id);
    const recipient = await UserModel.findById(populateRequest.recipient._id);
    sender.friends = [...sender.friends, recipient];
    recipient.friends = [...recipient.friends, sender];
    sender.save();
    recipient.save();
    res
      .status(200)
      .json(
        await FriendRequestModel.populate(response, {
          path: "sender recipient",
          select: "_id name",
        })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  sendFriendRequest,
  getFriendRequestByRecipient,
  getFriendRequestBySender,
  acceptRequest,
};
