const express = require("express");
const router = express.Router();
const controller = require("../controllers/token.controller");

router.get("/findallnft", controller.findallnft);
router.post("/transfer_20", controller.transfer_20);
router.post("/transfer_721", controller.transfer_721);
router.post("/mint", controller.mint);
router.post("/buynft", controller.buynft);
router.post("/sellnft", controller.sellnft);

module.exports = router;