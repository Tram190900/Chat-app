const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendRequestModel = new Schema({
  sender:{
    type: mongoose.Schema.ObjectId,
    ref:'User'
  },
  recipient:{
    type: mongoose.Schema.ObjectId,
    ref:'User'
  },
  stateAccept: {
    type: Boolean //True: accept, defaut: false
  }
},
{
    timestamps:true
});
module.exports = mongoose.model('FriendRequest', FriendRequestModel);