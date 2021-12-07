const express = require("express");
const router = express.Router();
const User = require("../models/User");
const VerbalTest = require("../models/verbalTest");

router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (e) {
    return res.status(400).json({ success: false, error: e });
  }
});

router.post("/savequestion", async (req, res) => {
  try {
    const verbalTest = new VerbalTest({
      verbalQuestions: req.body.test,
    });
    const saved = await verbalTest.save();
    res.status(200).json({
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

router.get("/getverbaltest", async (req, res) => {
  try {
    const test = await VerbalTest.findOne().sort({ _id: -1 });
    return res.status(200).json({
      success: true,
      data: test,
    });
  } catch (e) {
    return res.status(400).json({ success: false, error: e });
  }
});

module.exports = router;
