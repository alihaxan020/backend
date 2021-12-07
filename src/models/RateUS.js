const mongoose = require("mongoose");
var rateUsSchema = new mongoose.Schema(
  {
    dyslexia: {
      type: String,
    },
    selfassessment: {
      type: String,
    },
    app: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RateUs", rateUsSchema);
