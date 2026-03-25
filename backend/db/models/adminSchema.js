const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, default: "admin" },
  username: { type: String, default: "admin@admin.com" },
  password: { type: String, default: "admin" },
  avatar: {
    type: String,
    default: "https://ik.imagekit.io/4tkeso1ll/images.jpeg?updatedAt=1774468911915"
  },
  token: String,
  avatar_id: String,
  breakingNews: String
},{timestamps: true});

const adminColl = mongoose.model('admin', adminSchema);
module.exports = adminColl