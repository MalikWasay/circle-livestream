Object.defineProperty(global, "__stack", {
    get: function () {
        const orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) { return stack; };
        const err = new Error();
        Error.captureStackTrace(err, arguments.callee);
        const stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, "__line", {
    get: function (num) {
        return __stack[num || 1].getLineNumber();
    }
});

Object.defineProperty(global, "__file", {
    get: function (num) {
        const filePieces = __stack[num || 1].getFileName().split(/[\\/]/).slice(-1)[0].split(".");
        return filePieces.slice(0, filePieces.length - 1).join(".");
    }
});

Object.defineProperty(global, "__ext", {
    get: function (num) {
        return __stack[num || 1].getFileName().split(".").slice(-1)[0];
    }
});

Object.defineProperty(global, "__func", {
    get: function () {
        return arguments.callee.caller ? arguments.callee.caller.name : "global";
    }
});

Object.defineProperty(global, "__base", {
    get: function () {
        return process.cwd();
    }
});

Object.defineProperty(global, "__fili", {
    get: function (num) {
        let filid = ":";
        if (typeof global.__filid !== "undefined" && global.__filid) {
            filid = global.__filid;
        }

        return __stack[num || 1].getFileName() + filid + __stack[num || 1].getLineNumber();
    }
});
