// models/Notice.js

const mongoose = require("mongoose");

const blodSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    group: String,
    donar_id: String
  },
  {
    timestamps: true, // createdAt, updatedAt auto add
  }
);

module.exports = mongoose.model("blod", blodSchema);