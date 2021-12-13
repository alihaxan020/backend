const mongoose = require("mongoose");
var selfassessmentTestSchema = new mongoose.Schema(
  {
    test: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SelfAssessmentTest", selfassessmentTestSchema);
