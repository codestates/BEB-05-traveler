const express = require("express");
const router = express.Router();

const home = require("./home");
const user = require("./user");
const board = require("./board");
const token = require("./token");

router.use("/user", user);
router.use("/board", board);
router.use("/token", token);
router.use("/", home);

module.exports = router;