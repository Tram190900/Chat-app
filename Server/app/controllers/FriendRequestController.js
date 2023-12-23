const FriendRequestModel = require("../model/FriendRequestModel");

const sendFriendRequest = async (req, res, next) => {
  const { sender, recipient } = req.body;
  try {
    const friendRequest = await FriendRequestModel.findOne({
      sender: sender,
      recipient: recipient,
    });
    if(friendRequest) return res.status(200).json(chat)

    const newRequest = new FriendRequestModel({sender, recipient, stateAccept: false})
    const response = await newRequest.save()
    res.status(200).json(response)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getFriendRequestByRecipient = async (req, res, next)=>{
  const recipientId = req.params.recipientId
  try {
    const response = await FriendRequestModel.find({recipient: recipientId}).populate("sender recipient", "_id name")
    res.status(200).json(response)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

module.exports = { sendFriendRequest, getFriendRequestByRecipient };
