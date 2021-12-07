const express = require("express");
const router = express.Router();
const RateUs = require("../models/RateUs");
const { isAuth } = require("../middlewares/auth");

router.post("/rateus", isAuth, async (req, res) => {
  console.log("rate us");
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
});

module.exports = router;
