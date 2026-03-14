import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, default: "admin" },
  username: { type: String, default: "admin@admin.com" },
  password: { type: String, default: "admin" },
  avatar: String,
});

const adminColl = mongoose.model('admin', adminSchema);
