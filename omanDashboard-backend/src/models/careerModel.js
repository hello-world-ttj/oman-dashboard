const mongoose = require("mongoose");

const CareerSchema = mongoose.Schema(
  {
    description: {
      en: { type: String }, 
      ar: { type: String }, 
    },
    title: {
      en: { type: String }, 
      ar: { type: String },
    },
    image: { type: String },
    expiryDate: {
      type: Date,
    },
    status: {
      type: Boolean,
    },
    site: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Career = mongoose.model("Career", CareerSchema);

module.exports = Career;
