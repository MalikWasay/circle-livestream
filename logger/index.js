require("../global");
const pino = require("pino").default;
const pretty = require("pino-pretty");
const moment = require("moment");
const stream = pretty({
    colorize: true,
    singleLine: true,
    translateTime: "SYS:yyyy-mm-dd HH:MM:ss"
});
const {
    LOGGER_LEVEL = "info",
    LOGGER_STYLE = "no"
} = process.env;

const levels = {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20
};

const logger = pino({
    level: LOGGER_LEVEL,
    customLevels: levels,
    useOnlyCustomLevels: true,
    timestamp: () => `, "time":"${moment().format("YYYY-MM-DD HH:mm:ss")}"`
}, LOGGER_STYLE == "yes" ? stream : undefined);

module.exports = logger;
