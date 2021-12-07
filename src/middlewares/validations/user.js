const { check, validationResult } = require("express-validator");
exports.validateUserSignUp = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Must be a valid name!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be within 3 to 20 characters"),
  check("age").trim().not().isEmpty().withMessage("Enter your age"),
  check("gender").trim().not().isEmpty().withMessage("Please select gender"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("Password must be 8 to 20 characters long"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both password must be same!");
      }
      return true;
    }),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) {
    return next();
  } else {
    const error = result[0].msg;
    res.json({ success: false, message: error });
  }
};

exports.validateUserSignIn = [
  check("email").trim().isEmail().withMessage("Email / password is requird"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email / password is requird"),
];
