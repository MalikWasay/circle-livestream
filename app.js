const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const bodyParser = require("body-parser");
const responseTime = require("response-time");

const livestreamRouter = require("./routes/livestream.routes");

require("dotenv").config();
const { API_URL } = process.env;

const app = express();

logger.token("date", () => new Date().toISOString());

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(responseTime());
app.use(cors({ origin: true, credentials: true }));
app.use(logger("[:date] :remote-addr :method :url :status :response-time ms"));
app.use(helmet());
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => res.send("OK"));

app.use(`${API_URL}/livestream`, livestreamRouter);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
