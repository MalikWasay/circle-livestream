const http = require("http");
const moment = require("moment");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];
async function main() {

    require("./init")();
    const {
        PORT,
        GENERATE_SWAGGER_ON_START,
        CRON_JOBS
    } = process.env;

    const logger = require("./logger");

    // if (GENERATE_SWAGGER_ON_START === "yes") {
    //     logger.info({ generateSwaggerOnStart: GENERATE_SWAGGER_ON_START }, `${__file}:${__line} ` + "generating api swagger...");
    //     await swaggerAutogen(outputFile, endpointsFiles, swaggerDoc);
    //     logger.info({ generateSwaggerOnStart: GENERATE_SWAGGER_ON_START }, `${__file}:${__line} ` + "generating api swagger... done");

    // }

    const app = require("./app");
    app.set("port", PORT);
    const server = http.createServer(app);
    server.listen(PORT, () => logger.info(`${__file}:${__line} ` + `server is listening on : ${PORT}`));

    // if (CRON_JOBS == "yes") {
    //     require("./crons")();
    // }
}

main();
