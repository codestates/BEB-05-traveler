const express = require("express");
const router = express.Router();
const controller = require("../controllers/board.controller");

router.get("/posts", controller.posts);
router.post("/newpost", controller.newpost);
router.post("/post_update", controller.post_update);
router.post("/post_delete", controller.post_delete);
router.get("/postbyid", controller.postbyid); // id로 게시물 조회하는 부분 추가

module.exports = router;