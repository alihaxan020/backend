const RateUs = require("../models/RateUS");
exports.rateUs = async (req, res) => {
  try {
    const rating = new RateUs({
      dyslexia: req.body.dyslexia,
      selfassessment: req.body.selfassessment,
      app: req.body.app,
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

exports.getRating = async (req, res) => {
  const { test } = req.body;
  try {
    const ratingZero = await RateUs.find({})
      .where(test)
      .equals(0)
      .countDocuments();
    const ratingOne = await RateUs.find({})
      .where(test)
      .equals(1)
      .countDocuments();
    const ratingTwo = await RateUs.find({})
      .where(test)
      .equals(2)
      .countDocuments();
    const ratingThree = await RateUs.find({})
      .where(test)
      .equals(3)
      .countDocuments();
    const ratingFour = await RateUs.find({})
      .where(test)
      .equals(4)
      .countDocuments();
    const ratingFive = await RateUs.find({})
      .where(test)
      .equals(5)
      .countDocuments();

    const rating = {
      ratingZero: ratingZero,
      ratingOne: ratingOne,
      ratingTwo: ratingTwo,
      ratingThree: ratingThree,
      ratingFour: ratingFour,
      ratingFive: ratingFive,
    };
    return res.status(200).json({
      success: true,
      data: rating,
    });
  } catch (e) {
    return res.status(400).json({ success: false, error: e });
  }
};
