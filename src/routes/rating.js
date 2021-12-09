const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/auth");
const { rateUs, getRating } = require("../controllers/admin");

router.post("/rateus", isAuth, rateUs);
router.post("/getrating", getRating);
module.exports = router;
