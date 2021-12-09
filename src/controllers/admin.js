const RateUs = require("../models/RateUS");
exports.rateUs = async (req, res) => {
  try {
    const rating = new RateUs({
      dyslexia: req.body.dyslexia,
      selfassessment: req.body.selfassessment,
      app: req.body.app,
      name: req.user.name,
      age: req.user.age,
    });
    const saved = await rating.save();
    return res.status(200).json({
      success: true,
      data: saved,
    });
  } catch (e) {
    return res.status(400).json({
      message: "server error",
      error: e,
    });
  }
};
