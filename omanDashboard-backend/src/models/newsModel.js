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
      default: "published",
    },
    slug: { type: String },
    site: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const News = mongoose.model("News", NewsSchema);

module.exports = News;
