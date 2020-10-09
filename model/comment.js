const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  comment: {
    type: String,
    required: true,
    min: 5,
    max: 500,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
