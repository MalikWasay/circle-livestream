const { v4: uuidv4 } = require("uuid");
const { Stream, UserStream } = require("../models");

class LivestreamService {
  async createStream(userId, title) {
    const streamKey = uuidv4();
    const refNo = uuidv4();
    
    // Use environment variable for server URL or default to localhost
    const serverUrl = process.env.STREAM_SERVER_URL || "http://localhost:8000";
    const playback_url = `${serverUrl}/live/${streamKey}/index.m3u8`;

    const stream = await Stream.create({
      ref_no: refNo,
      title,
      stream_key: streamKey,
      user_id: userId,
      playback_url,
      status: "pending"
    });

    return stream;
  }

  async getStreamByKey(streamKey) {
    const stream = await Stream.findOne({ 
      where: { stream_key: streamKey },
      include: [{
        model: require("../models").User,
        as: "user",
        attributes: ["id", "name"]
      }]
    });
    return stream;
  }

  async getStreamById(streamId) {
    const stream = await Stream.findByPk(streamId, {
      include: [{
        model: require("../models").User,
        as: "user",
        attributes: ["id", "name"]
      }]
    });
    return stream;
  }

  async getAllStreams() {
    return await Stream.findAll({
      include: [{
        model: require("../models").User,
        as: "user",
        attributes: ["id", "name"]
      }],
      order: [["createdAt", "DESC"]]
    });
  }

  async updateStreamStatus(streamId, status) {
    if (!["pending", "live", "ended"].includes(status)) {
      throw new Error("Invalid status. Must be pending, live, or ended");
    }

    const stream = await Stream.findByPk(streamId);
    if (!stream) {
      throw new Error("Stream not found");
    }

    await stream.update({ status });
    return stream;
  }

  async startStream(streamId) {
    return await this.updateStreamStatus(streamId, "live");
  }

  async endStream(streamId) {
    return await this.updateStreamStatus(streamId, "ended");
  }

  async joinStream(userId, streamRefNo) {
    const stream = await Stream.findOne({
      where: { ref_no: streamRefNo }
    });
    
    if (!stream) {
      throw new Error("Stream not found");
    }

    if (stream.status === "ended") {
      throw new Error("Cannot join ended stream");
    }

    const existing = await UserStream.findOne({
      where: { userId, streamId: stream.id }
    });
    
    if (existing) return existing;

    const userStream = await UserStream.create({
      userId,
      streamId: stream.id,
      refNo: uuidv4()
    });

    return userStream;
  }

  async getStreamParticipants(streamId) {
    return await UserStream.findAll({
      where: { streamId },
      include: [{
        model: require("../models").User,
        as: "user",
        attributes: ["id", "name"]
      }]
    });
  }
}

module.exports = new LivestreamService();
