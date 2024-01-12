const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatModel = new Schema({
  members:Array,
  isGroup: {type:Boolean},
  nameGroup:{type: String}
},
{
    timestamps:true
});
module.exports = mongoose.model('Chat', chatModel);