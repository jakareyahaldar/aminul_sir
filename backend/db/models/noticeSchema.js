// models/Notice.js

const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String
    },
    breaking: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true, // createdAt, updatedAt auto add
  }
);

module.exports = mongoose.model("Notice", noticeSchema);