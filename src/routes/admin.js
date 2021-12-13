const express = require("express");
const router = express.Router();
const User = require("../models/User");
const WrittenTest = require("../models/writtenTest");
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

router.post("/save-verbaltest", async (req, res) => {
  try {
    const verbalTest = new VerbalTest({
      test: req.body.name,
      level: req.body.level,
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

router.post("/getverbaltest", async (req, res) => {
  try {
    const test = await VerbalTest.find()
      .sort({ $natural: -1 })
      .limit(1)
      .where("test")
      .equals(req.body.test)
      .where("level")
      .equals(req.body.level);
    return res.status(200).json({
      success: true,
      data: test,
    });
  } catch (e) {
    return res.status(400).json({ success: false, error: e });
  }
});

router.post("/save-writtentest", async (req, res) => {
  try {
    const writtenTest = new WrittenTest({
      test: req.body.name,
      level: req.body.level,
      verbalQuestions: req.body.test,
    });
    const saved = await writtenTest.save();
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
router.post("/getwrittentest", async (req, res) => {
  try {
    const test = await WrittenTest.find()
      .sort({ $natural: -1 })
      .limit(1)
      .where("test")
      .equals(req.body.test)
      .where("level")
      .equals(req.body.level);
    return res.status(200).json({
      success: true,
      data: test,
    });
  } catch (e) {
    return res.status(400).json({ success: false, error: e });
  }
});

module.exports = router;
