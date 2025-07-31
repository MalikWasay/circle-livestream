const path = require("path");
const moment = require("moment");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { DateTime } = require("luxon");
const { saltRounds } = require("../config/generalConfig.json");
class service {
    constructor() {
        this.line = this.line.bind(this);
    }

    camelCase(payload) {
        const response = {};
        for (const key in payload) {
            response[_.camelCase(key)] = payload[key];
        }
        return response;
    }

    clone(payload) {
        return JSON.parse(JSON.stringify(payload));
    }

    isObject(a) {
        return (!!a) && (a.constructor === Object);
    }

    isArray(a) {
        return (!!a) && (a.constructor === Array);
    }

    mod(numA, numB) {
        return numA % numB == 0;
    }

    rand(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    generateHash(data) {
        return bcrypt.hash(data, saltRounds);
    }
    compareHash(data, hash) {
        return bcrypt.compare(data, hash);
    }

    roundRobinNum(num) {
        let i = 0;
        return () => {
            ++i;
            i = i > num ? 1 : i;
            return i % (1 + num);
        };
    }

    replaceGlobally(originalText, searchText, replaceText) {
        const regex = new RegExp(searchText, "g");
        return originalText.replace(regex, replaceText);
    }

    convertFileName(str) {
        return (str || "").toLowerCase().replace(/ /g, "_").trim();
    }

    range(a, b, step) {
        let A = [];
        if (typeof a == "number") {
            A[0] = a;
            step = step || 1;
            while (a + step <= b) {
                A[A.length] = a += step;
            }
        } else {
            let s = "abcdefghijklmnopqrstuvwxyz";
            if (a === a.toUpperCase()) {
                b = b.toUpperCase();
                s = s.toUpperCase();
            }
            s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
            A = s.split("");
        }
        return A;
    }

    getOtp() {
        return Math.floor(10000 + Math.random() * 90000);
    }

    filterKeys(payload, value) {
        if (value) {
            let filteredValue = value;

            for (const key in payload.userDetails) {
                filteredValue = this.replaceGlobally(filteredValue, `<<${key}>>`, payload.userDetails[key]);
            }
            return filteredValue;
        }

        return null;
    }

    getTime(time) {
        return time ? time.format("YYYY-MM-DD HH:mm:ss") : moment().format("YYYY-MM-DD HH:mm:ss");
    }

    line(num = 2) {
        try {
            const e = new Error();
            const regex = /\((.*):(\d+):(\d+)\)$/;
            const match = regex.exec(e.stack.split("\n")[num]);
            const filepath = match[1];
            const fileName = path.basename(filepath);
            const line = match[2];
            const column = match[3];
            return {
                filepath,
                fileName,
                line,
                column,
                str: `${this.getTime()} - ${fileName}:${line}:${column}`
            };
        } catch (error) {
            return {
                str: `${this.getTime()} - `
            };
        }
    }

    generateRandomCode(length, numberOnly = false) {
        if (!length) {
            return uuidv4(); // If no length is provided, return a UUID
        }

        const nonZeroDigits = "123456789";
        const digits = "0123456789";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // First character should not be 0
        let code = numberOnly
            ? nonZeroDigits.charAt(Math.floor(Math.random() * nonZeroDigits.length))
            : (letters + nonZeroDigits).charAt(Math.floor(Math.random() * (letters.length + nonZeroDigits.length)));

        // Rest of the characters can include 0
        const characters = numberOnly ? digits : (letters + digits);
        for (let i = 1; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return code;
    };

    toSlug(str) {
        return str.trim().toLowerCase().replace(/[\s,-]+/g, "-");
    }

    generateRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    combineDateTimeFromUserTimezone(dateStr, timeStr, timezone) {
        const [hour, minute] = timeStr.split(":").map(Number);

        const date = new Date(dateStr);
        const dt = DateTime.fromObject(
            {
                year: date.getUTCFullYear(),
                month: date.getUTCMonth() + 1,
                day: date.getUTCDate(),
                hour,
                minute
            },
            { zone: timezone }
        );

        if (!dt.isValid) {
            throw new Error("Invalid date, time, or timezone");
        }

        return dt.toUTC().toJSDate();
    }

}

module.exports = new service();
