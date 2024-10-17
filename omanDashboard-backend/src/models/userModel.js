const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      en: { type: String },
      ar: { type: String },
    },
    designation: {
      en: { type: String },
      ar: { type: String },
    },
    bio: {
      en: { type: String },
      ar: { type: String },
    },
    image: { type: String },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
