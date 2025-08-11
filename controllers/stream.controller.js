const livestreamService = require("../services/livestream.service");

exports.createStream = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user?.authUser?.id || req.user?.id;

    if (!title || !userId) {
      return res.status(400).json({ 
        success: false,
        message: "Missing title or userId" 
      });
    }

    const stream = await livestreamService.createStream(userId, title);
    return res.status(201).json({
      success: true,
      data: stream,
      message: "Stream created successfully"
    });
  } catch (err) {
    console.error("Create stream error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};

exports.getStreamByKey = async (req, res) => {
  try {
    const { streamKey } = req.query;
    
    if (!streamKey) {
      return res.status(400).json({
        success: false,
        message: "Stream key is required"
      });
    }

    const stream = await livestreamService.getStreamByKey(streamKey);

    if (!stream) {
      return res.status(404).json({ 
        success: false,
        message: "Stream not found" 
      });
    }

    return res.status(200).json({
      success: true,
      data: stream
    });
  } catch (err) {
    console.error("Get stream by key error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};

exports.getStreamById = async (req, res) => {
  try {
    const { id } = req.params;
    const streamId = parseInt(id);

    if (isNaN(streamId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid stream ID"
      });
    }

    const stream = await livestreamService.getStreamById(streamId);

    if (!stream) {
      return res.status(404).json({ 
        success: false,
        message: "Stream not found" 
      });
    }

    return res.status(200).json({
      success: true,
      data: stream
    });
  } catch (err) {
    console.error("Get stream by ID error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};

exports.getAllStreams = async (req, res) => {
  try {
    const streams = await livestreamService.getAllStreams();
    return res.status(200).json({
      success: true,
      data: streams,
      count: streams.length
    });
  } catch (err) {
    console.error("Get all streams error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};

exports.updateStreamStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const streamId = parseInt(id);

    if (isNaN(streamId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid stream ID"
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const stream = await livestreamService.updateStreamStatus(streamId, status);
    return res.status(200).json({
      success: true,
      data: stream,
      message: `Stream status updated to ${status}`
    });
  } catch (err) {
    console.error("Update stream status error:", err);
    
    if (err.message.includes("Invalid status")) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (err.message.includes("Stream not found")) {
      return res.status(404).json({
        success: false,
        message: err.message
      });
    }

    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};

exports.startStream = async (req, res) => {
  try {
    const { id } = req.params;
    const streamId = parseInt(id);

    if (isNaN(streamId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid stream ID"
      });
    }

    const stream = await livestreamService.startStream(streamId);
    return res.status(200).json({
      success: true,
      data: stream,
      message: "Stream started successfully"
    });
  } catch (err) {
    console.error("Start stream error:", err);
    
    if (err.message.includes("Stream not found")) {
      return res.status(404).json({
        success: false,
        message: err.message
      });
    }

    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};

exports.endStream = async (req, res) => {
  try {
    const { id } = req.params;
    const streamId = parseInt(id);

    if (isNaN(streamId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid stream ID"
      });
    }

    const stream = await livestreamService.endStream(streamId);
    return res.status(200).json({
      success: true,
      data: stream,
      message: "Stream ended successfully"
    });
  } catch (err) {
    console.error("End stream error:", err);
    
    if (err.message.includes("Stream not found")) {
      return res.status(404).json({
        success: false,
        message: err.message
      });
    }

    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};

exports.joinStream = async (req, res) => {
  try {
    const { streamRefNo } = req.body;
    const userId = req.user?.authUser?.id || req.user?.id;

    if (!streamRefNo || !userId) {
      return res.status(400).json({ 
        success: false,
        message: "Missing streamRefNo or userId" 
      });
    }

    const joined = await livestreamService.joinStream(userId, streamRefNo);
    return res.status(201).json({
      success: true,
      data: joined,
      message: "Successfully joined stream"
    });
  } catch (err) {
    console.error("Join stream error:", err);
    
    if (err.message.includes("Stream not found")) {
      return res.status(404).json({
        success: false,
        message: err.message
      });
    }
    
    if (err.message.includes("Cannot join ended stream")) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};

exports.getStreamParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const streamId = parseInt(id);

    if (isNaN(streamId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid stream ID"
      });
    }

    const participants = await livestreamService.getStreamParticipants(streamId);
    return res.status(200).json({
      success: true,
      data: participants,
      count: participants.length
    });
  } catch (err) {
    console.error("Get stream participants error:", err);
    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
};