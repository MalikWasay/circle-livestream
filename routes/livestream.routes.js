const express = require("express");
const router = express.Router();
const livestreamController = require("../controllers/stream.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");

router.post("/streams", authenticationMiddleware(), livestreamController.createStream);
router.get("get/streams", authenticationMiddleware(), livestreamController.getAllStreams);
router.get("get/streams-by-key", authenticationMiddleware(), livestreamController.getStreamByKey);
router.post("/streams/join", authenticationMiddleware(), livestreamController.joinStream);

module.exports = router;
