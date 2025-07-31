const authService = require("../services/auth.service");
const logger = require("../logger");

function middleware(check = null) {
    return async (req, res, next) => {
        try {
            if (check === "Token") {
                await authService.checkAuthentication(req, check);
                logger.info({ authUser: req.user.authUser }, `${__file}:${__line} ` + "Token Authentication successful");
            } else {

                await authService.checkAuthentication(req);
                logger.info({ authUser: req.user.authUser }, `${__file}:${__line} ` + "Authentication successful");
            }
        } catch (error) {
            logger.error(error, `${__file}:${__line} ` + "Got error in authentication middleware");
            return res.status(401).send({
                status: 401,
                success: false,
                message: error.message,
                data: null
            });
        }

        next();
    };
}

module.exports = middleware;
