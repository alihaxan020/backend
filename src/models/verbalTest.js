const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var verbalTestSchema = new mongoose.Schema(
  {
    verbalQuestions: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerbalTest", verbalTestSchema);
