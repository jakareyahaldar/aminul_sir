const mongoose = require('mongoose');
const { Schema } = mongoose;

const sliderSchema = new Schema({
  text: String,
  image: String,
  image_id: String
},{timestamps: true});

const sliderColl = mongoose.model('slider', sliderSchema);
module.exports = sliderColl