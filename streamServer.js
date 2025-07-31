// // media-server.js
// const NodeMediaServer = require("node-media-server");
// const config = require("./config/nms.config");

// const nms = new NodeMediaServer(config);
// nms.run();


const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: { port: 1935 },
  http: {
    port: 8000,
    allow_origin: "*",
  },
  trans: {
    ffmpeg: "C:/Users/WASee/Downloads/ffmpeg-7.1.1-essentials_build/bin/ffmpeg.exe",
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        hlsPath: "./media",
      },
    ],
  },
};

var nms = new NodeMediaServer(config);
nms.run();
