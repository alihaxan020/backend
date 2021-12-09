const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/auth");
const { rateUs } = require("../controllers/admin");

router.post("/rateus", isAuth, rateUs);

module.exports = router;
