const express = require("express");
const router = express.Router();
const controller = require("../controllers/token.controller");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get("/findallnft", controller.findallnft);
router.post("/transfer_20", controller.transfer_20);
router.post("/transfer_721", controller.transfer_721);
router.post("/mint", upload.single("img"), controller.mint);
router.post("/buynft", controller.buynft);
router.post("/sellnft", controller.sellnft);

module.exports = router;
