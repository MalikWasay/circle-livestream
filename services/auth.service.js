const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, RESET_TOKEN_SECRET } = process.env;
const { userModel } = require("../models");
const logger = require("../logger");
const jwtService = require("../services/jwt.service");

const { requestsConfig } = require("../config/generalConfig");

class service {
    async checkAuthentication(req, check = null) {
        const { authorization } = req.headers;
        if (!authorization) {
            const responseMessage = "authorization header is required.";
            logger.error({ responseMessage }, `${__file}:${__line} ` + "header not found");
            throw new Error(responseMessage);
        }

        const [tokenType, tokenHash] = authorization.split(" ");
        if (!tokenType || tokenType != "Bearer") {
            const responseMessage = "Invalid token type, it should be 'Bearer'";
            logger.error({ responseMessage }, `${__file}:${__line} ` + "header not valid");
            throw new Error(responseMessage);
        }

        try {
            if (check === "Token") {
                const decoded = await jwtService.verifyResetToken(tokenHash);
                req.user.authUser = decoded;
                return;
            }
            const decoded = await jwtService.verifyAccessToken(tokenHash);
            req.user = req.user || {};
            req.user.authUser = decoded;
        } catch (error) {
            const responseMessage = "Invalid token.";
            logger.error(error, `${__file}:${__line} ` + `${responseMessage}`);
            throw new Error(responseMessage);
        }

    }

    async isAuthorized(req) {
        const { method } = req;
        const action = requestsConfig[method];
        const { id } = req.user.authUser;
        const foundUser = await userModel.query().where({ id }).first().withGraphFetched(`[
            role.[permissions]
            ]`);
        const { permissions } = foundUser.role;
        for (const permission of permissions) {
            const { name } = permission;
            if (action == name) {
                return true;
            }
        }
        throw new Error("You Are Not Authorized To Perform This Action");
    }

}

module.exports = new service();
