const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.post("/login", controller.login);
router.post("/join", controller.join);
router.get("/info", controller.info);

module.exports = router;
