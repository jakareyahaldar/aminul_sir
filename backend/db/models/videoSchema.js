const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: String,
  url: String,
  type: String,
  category: String,
},{timestamps: true});

const videoColl = mongoose.model('video', videoSchema);
module.exports = videoColl