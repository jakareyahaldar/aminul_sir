const mongoose = require('mongoose');
const { Schema } = mongoose;

const examSchema = new Schema({
  title: String,
  path: String,
},{timestamps: true});

const examColl = mongoose.model('exam', examSchema);
module.exports = examColl