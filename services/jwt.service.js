const jwt = require("jsonwebtoken");
const { line } = require("./app.service");
const logger = require("../logger");
const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    RESET_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE,
    RESET_TOKEN_LIFE,
    COMMUNITY_MEMBER_TOKEN_SECRET
} = process.env;

class service {
    async genTokenByRefreshToken(payload) {
        const { refreshToken } = payload;

        const { iat, exp, ...decodedPayload } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign(decodedPayload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });

        return { accessToken, refreshToken, ...decodedPayload };
    }

    async genToken(payload) {
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFE });

        return { accessToken, refreshToken, ...payload };
    }

    async generateAccessToken(payload) {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE });
    }

    async generateRefreshToken(payload) {
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_LIFE
        });
    }

    async generateResetToken(payload) {
        return jwt.sign(payload, RESET_TOKEN_SECRET, {
            expiresIn: RESET_TOKEN_LIFE
        });
    }

    async isTokenExpired(token) {
        if (token && this.verifyAccessToken(token)) {
            const decoded = jwt.decode(token);
            const currentTime = Date.now() / 1000;
            return decoded?.exp < currentTime;
        }
    }

    async verifyAccessToken(token) {
        const decodeToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return decodeToken;
    }

    async verifyRefreshToken(token) {
        const decodeToken = jwt.verify(token, REFRESH_TOKEN_SECRET);
        return decodeToken;
    }

    async verifyResetToken(token) {
        const decodeToken = jwt.verify(token, RESET_TOKEN_SECRET);
        return decodeToken;
    }
}

module.exports = new service();
