const express = require("express");
const { testSupervisor } = require("../controller/supervisorController.js");
const router = express.Router();

router.get("/supervisorTest", testSupervisor);

module.exports = router;
