const mongoose = require("mongoose");
var verbalTestSchema = new mongoose.Schema(
  {
    verbalQuestions: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerbalTest", verbalTestSchema);
