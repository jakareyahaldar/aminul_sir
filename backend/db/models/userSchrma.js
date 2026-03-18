const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  phone: String,
  username: String,
  password: String,
  avatar: String,
  token: String,
  isAprove: {type: Boolean, default: false}
},{timestamps: true});

const userColl = mongoose.model('user', userSchema);
module.exports = userColl