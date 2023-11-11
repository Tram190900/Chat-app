const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatModel = new Schema({
  members:Array
},
{
    timestamps:true
});
module.exports = mongoose.model('Chat', chatModel);