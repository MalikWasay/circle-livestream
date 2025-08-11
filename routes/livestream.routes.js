const express = require("express");
const router = express.Router();
const livestreamController = require("../controllers/stream.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");

// Create a new stream
router.post("/streams", authenticationMiddleware(), livestreamController.createStream);

// Get all streams
router.get("/streams", authenticationMiddleware(), livestreamController.getAllStreams);

// Get stream by ID
router.get("/streams/:id", authenticationMiddleware(), livestreamController.getStreamById);

// Get stream by stream key
router.get("/streams/key", authenticationMiddleware(), livestreamController.getStreamByKey);

// Update stream status
router.patch("/streams/:id/status", authenticationMiddleware(), livestreamController.updateStreamStatus);

// Start stream
router.post("/streams/:id/start", authenticationMiddleware(), livestreamController.startStream);

// End stream
router.post("/streams/:id/end", authenticationMiddleware(), livestreamController.endStream);

// Join a stream
router.post("/streams/join", authenticationMiddleware(), livestreamController.joinStream);

// Get stream participants
router.get("/streams/:id/participants", authenticationMiddleware(), livestreamController.getStreamParticipants);

module.exports = router;
