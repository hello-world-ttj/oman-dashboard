const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    priority: { type: Number },
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
    type: [{ type: String, trim: true }],
    status: {
      type: String,
    },
    site: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
