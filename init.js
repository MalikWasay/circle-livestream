require("./global");
module.exports = (envName) => {
    if (!envName) {

        const { Command, Option } = require("commander");
        const program = new Command();

        const options = program
            .addOption(
                new Option("-e, --env-name <string>", "env name")
                    .makeOptionMandatory(true))
            .parse().opts();

        require("dotenv-expand").expand(require("dotenv").config({
            path: `./envs/.env.${options.envName}`
        }));
        const log = require("./logger");
        log.info(options, "Project start with this option");
    } else {
        require("dotenv-expand").expand(require("dotenv").config({
            path: `./envs/.env.${envName}`
        }));
    }
};
