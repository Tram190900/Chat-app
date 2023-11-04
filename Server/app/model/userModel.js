const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  name: { type: String, required: true, minlenght: 3, maxlenght: 50 },
  email: {type: String, required: true, minlenght:3, maxlenght:100, unique: true},
  password: {type: String, required: true, minlenght:3, maxlenght:100},
},
{
    timestamps:true
});
module.exports = mongoose.model('User', userModel);
