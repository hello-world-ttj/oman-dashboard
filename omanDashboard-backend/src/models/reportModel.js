const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema(
  {
    image: { type: String },
    media: {
      type: String,
    },
    status: {
      type: String,
    },
    site: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
