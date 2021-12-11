const User = require("../models/User");
const ContactUs = require("../models/ContactUs");
const cloudinary = require("../helper/ImageUpload");
const {
  generateOTP,
  resetPasswordTemplate,
  mailTransport,
} = require("../utils/mail");
exports.createUser = async (req, res) => {
  const { name, age, gender, email, password } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser) {
    return res.json({
      success: false,
      message: "This email is already in use.",
    });
  }
  const user = await User({
    name,
    age,
    gender,
    email,
    password,
  });
  await user.save();
  res.json(user);
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.json({
      success: false,
      message: "User is not found with given email.",
    });
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "Email or password is incorrect",
    });
  const jwt = require("jsonwebtoken");
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ success: true, user, token });
};
exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }
    res.json({ success: true, message: "Sign out successfully!" });
  }
};

exports.uploadProfile = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access!" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile`,
      width: 500,
      height: 500,
      crop: "fill",
    });
    await User.findByIdAndUpdate(user._id, { avatar: result.secure_url });
    res.status(201).json({
      success: true,
      message: "Your profile has been updated",
      image: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "sever error try after some time",
    });
  }
};
exports.updateProfile = async (req, res) => {
  const { gender, name, age } = req.body;
  const { user } = req;
  try {
    await User.findByIdAndUpdate(user._id, {
      name: name,
      gender: gender,
      age: age,
    });
    res.status(201).json({
      success: true,
      message: "Your profile has been updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
exports.updatePassword = async (req, res, next) => {
  const { newPassword } = req.body;
  const { user } = req;
  try {
    user.password = newPassword;
    await user.save();
    res.status(201).json({
      success: true,
      message: "Your password has been updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        success: false,
        message: "User is not found with given email.",
      });
    const otp = generateOTP();
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    const data = {
      otp: otp,
      token: token,
    };
    mailTransport()
      .sendMail({
        from: "letsworksalihassan@gmail.com",
        to: email,
        subject: "Reset password OTP",
        html: resetPasswordTemplate(otp),
      })
      .then(
        res.status(201).json({
          success: true,
          message: "check your email for OTP",
          otp: data,
        })
      )
      .catch(console.catch);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.contactUsForm = async (req, res) => {
  const { title, description } = req.body;
  try {
    const contactus = new ContactUs({
      title: title,
      description: description,
      name: req.user.name,
      age: req.user.age,
      gender: req.user.gender,
    });
    const saved = await contactus.save();
    return res.status(200).json({
      success: true,
      data: saved,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
