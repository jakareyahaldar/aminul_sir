const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  phone: String,
  username: String,
  password: String,
  avatar: {
    type: String,
    default: "https://ik.imagekit.io/4tkeso1ll/images.jpeg?updatedAt=1774468911915"
  },
  avatar_id: String,
  token: String,
  isAprove: {type: Boolean, default: false}
},{timestamps: true});

const userColl = mongoose.model('user', userSchema);
module.exports = userColl