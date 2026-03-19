const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, default: "admin" },
  username: { type: String, default: "admin@admin.com" },
  password: { type: String, default: "admin" },
  avatar: String,
  token: String,
  avatar_id: String
},{timestamps: true});

const adminColl = mongoose.model('admin', adminSchema);
module.exports = adminColl