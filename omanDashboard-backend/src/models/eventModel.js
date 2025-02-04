const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    title: {
      en: { type: String },
      ar: { type: String },
    },
    image: { type: String },
    video: { type: String },
    status: { type: String },
    site: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
