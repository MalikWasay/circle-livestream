const path = require('path');

module.exports = {
  rtmp: { 
    port: process.env.RTMP_PORT || 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: process.env.HTTP_PORT || 8000,
    allow_origin: "*",
    mediaroot: path.join(__dirname, '..', 'media'),
  },
  trans: {
    ffmpeg: process.env.FFMPEG_PATH || "ffmpeg",
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        hlsPath: path.join(__dirname, "..", "media", "hls"),
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
        dashPath: path.join(__dirname, "..", "media", "dash"),
      },
    ],
  },
  auth: {
    api: true,
    api_user: process.env.API_USER || "admin",
    api_pass: process.env.API_PASS || "admin",
    play: false,
    publish: false,
    secret: process.env.SECRET || "nodemedia2017privatekey"
  },
  relay: {
    ffmpeg: process.env.FFMPEG_PATH || "ffmpeg",
    tasks: [
      {
        app: "live",
        mode: "static",
        edge: "rtmp://localhost/live",
        name: "stream",
        rtsp_transport: "tcp"
      }
    ]
  }
};
