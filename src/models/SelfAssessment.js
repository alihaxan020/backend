const mongoose = require("mongoose");
var selfassessmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    severity: {
      type: String,
    },
    userAssessment: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SelfAssessment", selfassessmentSchema);
