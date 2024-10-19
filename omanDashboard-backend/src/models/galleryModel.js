const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema(
  {
    title: {
      en: { type: String },
      ar: { type: String },
    },
    image: { type: String },
    site: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;
