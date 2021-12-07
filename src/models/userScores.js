const mongoose = require("mongoose");
var userScoresSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    obtainedScore: {
      type: String,
    },
    totalScore: {
      type: String,
    },
    level: {
      type: String,
    },
    test: {
      type: String,
    },
    attempt: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userScoresSchema.statics.findByTest = function (userId, test, level) {
  return this.where("userId")
    .equals(userId)
    .where("test")
    .equals(test)
    .where("level")
    .equals(level);
};
userScoresSchema.query.byTest = function (test) {
  return this.where({ test: new RegExp(test, "i") });
};
userScoresSchema.query.byLevel = function (level) {
  return this.where({ level: new RegExp(level, "i") });
};
module.exports = mongoose.model("UserScoresSchema", userScoresSchema);
