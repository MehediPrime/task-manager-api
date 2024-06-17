const express = require("express");
const { testExecutor } = require("../controller/executorController.js");
const router = express.Router();

router.get("/executorTest", testExecutor);

module.exports = router;
