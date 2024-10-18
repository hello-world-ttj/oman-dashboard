const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema(
  {
    tag: { type: String },
    title: {
      en: { type: String }, 
      ar: { type: String }, 
    },
    content: {
      en: { type: String },  
      ar: { type: String },  
    },
    image: { type: String },
    banner: { type: String },
    status: {
      type: String,
      enum: ["published", "unpublished"],
      default: "unpublished",
    },
    slug: { type: String },
  },
  { timestamps: true }
);

const News = mongoose.model("News", NewsSchema);

module.exports = News;
