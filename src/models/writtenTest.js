const mongoose = require("mongoose");
var writtentestSchema = new mongoose.Schema(
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

module.exports = mongoose.model("WrittenTest", writtentestSchema);
