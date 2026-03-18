const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  level: String,
  category: String,
  size: String,
  file_type: String,
  file_url: String
},{timestamps: true});

const bookColl = mongoose.model('book', bookSchema);
module.exports = bookColl