const livestreamService = require("../services/livestream.service");

exports.createStream = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user?.authUser?.id || req.user?.id;

    if (!title || !userId) {
      return res.status(400).json({ message: "Missing title or userId" });
    }

    const stream = await livestreamService.createStream(userId, title);
    return res.status(201).json(stream);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getStreamByKey = async (req, res) => {
  try {
    const { streamKey } = req.query;
    const stream = await livestreamService.getStreamByKey(streamKey);

    if (!stream) {
      return res.status(404).json({ message: "Stream not found" });
    }

    return res.status(200).json(stream);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllStreams = async (req, res) => {
  try {
    const streams = await livestreamService.getAllStreams();
    return res.status(200).json(streams);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.joinStream = async (req, res) => {
  try {
    const { streamRefNo } = req.body;
    const userId = req.user?.authUser?.id || req.user?.id;

    if (!streamRefNo || !userId) {
      return res.status(400).json({ message: "Missing streamId or userId" });
    }

    const joined = await livestreamService.joinStream(userId, streamRefNo);
    return res.status(201).json(joined);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};