const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 128,
    },
    author: {
      type: String,
      required: true,
      maxlength: 128,
    },
    story: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", StorySchema);
