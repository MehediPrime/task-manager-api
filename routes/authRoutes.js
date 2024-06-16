const express = require("express");
const {
  login,
  registration,
  refresh,
} = require("../controller/authController.js");

const router = express.Router();

router.post("/login", login);
router.post("/register", registration);
router.post("/refresh-token", refresh);

module.exports = router;
