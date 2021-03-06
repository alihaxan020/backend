const mongoose = require("mongoose");
var verbalTestSchema = new mongoose.Schema(
  {
    test: {
      type: String,
    },
    level: {
      type: String,
    },
    verbalQuestions: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerbalTest", verbalTestSchema);
