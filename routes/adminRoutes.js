const express = require("express");

const { testAdmin } = require("../controller/adminController.js");

const router = express.Router();

router.get("/adminTest", testAdmin);

module.exports = router;
