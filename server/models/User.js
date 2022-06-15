const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    dp: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
