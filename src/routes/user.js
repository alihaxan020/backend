const express = require("express");
const UserScores = require("../models/userScores");
const router = express.Router();
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require("../middlewares/validations/user");
const {
  createUser,
  userSignIn,
  signOut,
  uploadProfile,
  updatePassword,
  updateProfile,
  forgetPassword,
} = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");
const User = require("../models/User");
const multer = require("multer");

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const uploads = multer({ storage, fileFilter });
router.post("/create-user", validateUserSignUp, userValidation, createUser);
router.post("/sign-in", validateUserSignIn, userValidation, userSignIn);
router.get("/sign-out", isAuth, signOut);
router.get("/profile", isAuth, (req, res) => {
  if (!req.user)
    return res.json({ success: false, message: "unauthorized access!" });
  res.json({
    success: true,
    profile: {
      name: req.user.name,
      age: req.user.age,
      gender: req.user.gender,
      email: req.user.email,
      password: req.user.password,
      avatar: req.user.avatar ? req.user.avatar : "",
    },
  });
});
router.post(
  "/upload-profile",
  isAuth,
  uploads.single("profile"),
  uploadProfile
);

router.post("/userscores", isAuth, async (req, res) => {
  try {
    const userScores = new UserScores({
      userId: req.user._id,
      obtainedScore: req.body.obtainedScore,
      totalScore: req.body.totalScore,
      level: req.body.level,
      test: req.body.test,
    });
    const saved = await userScores.save();
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

router.post("/getuserscores", isAuth, async (req, res) => {
  const { test } = req.body;
  try {
    const testTotal = await UserScores.where("userId")
      .equals(req.user._id)
      .byTest(test)
      .countDocuments();
    const levelOne = await UserScores.where("userId")
      .equals(req.user._id)
      .where("test")
      .equals(test)
      .byLevel("Level 1")
      .countDocuments();
    const levelTwo = await UserScores.where("userId")
      .equals(req.user._id)
      .where("test")
      .equals(test)
      .byLevel("Level 2")
      .countDocuments();
    const levelThree = await UserScores.where("userId")
      .equals(req.user._id)
      .where("test")
      .equals(test)
      .byLevel("Level 3")
      .countDocuments();
    const data = {
      test: testTotal,
      levelOne: levelOne,
      levelTwo: levelTwo,
      levelThree: levelThree,
    };
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (e) {
    return res.status(400).json({ success: false, error: e });
  }
});
router.post("/updatepassword", isAuth, updatePassword);
router.post("/updateprofile", isAuth, updateProfile);
router.post("/forget-password", forgetPassword);
module.exports = router;
