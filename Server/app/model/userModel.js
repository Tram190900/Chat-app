const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  name: { type: String, required: true, minlenght: 3, maxlenght: 50 },
  email: {type: String, required: true, minlenght:3, maxlenght:100, unique: true},
  password: {type: String, required: true, minlenght:3, maxlenght:100},
  avatar: {type:String, require:true, maxlenght:200},
  phoneNumber: {type: String, require: true, maxlenght:10},
  gender:{type: Boolean},
  dateOfBirth:{type: Date},
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
},
{
    timestamps:true
});
module.exports = mongoose.model('User', userModel);
