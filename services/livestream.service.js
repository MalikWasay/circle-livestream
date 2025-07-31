const { v4: uuidv4 } = require("uuid");
const { Stream, UserStream } = require("../models");

class LivestreamService {
  async createStream(userId, title) {
    const streamKey = uuidv4();

    const playback_url = `http://localhost:8000/live/${streamKey}/index.m3u8`;

    const stream = await Stream.create({
      ref_no: uuidv4(),
      title,
      stream_key: streamKey,
      user_id: userId,
      playback_url
    });

    return stream;
  }

  async getStreamByKey(streamKey) {
    const stream = await Stream.findOne({ where: { streamKey } });
    return stream;
  }

  async getAllStreams() {
    return await Stream.findAll();
  }

  async joinStream (userId, streamRefNo) {
  const stream = await Stream.findOne({
    where: {refNo: streamRefNo}
  });
  if (!stream) {
    throw new Error("Stream not found");
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
};
}

module.exports = new LivestreamService();
