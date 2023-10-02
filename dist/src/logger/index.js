"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const ecsFormat = require("@elastic/ecs-winston-format");
require("winston-daily-rotate-file");
const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};
const logStack = winston.format((info, opts) => {
    const ecsFields = {
        "@timestamp": new Date().toISOString(),
        "log.level": info.level,
        message: info.message,
        service: "tms-chat",
        body: info.body || {},
        errorObj: info.errorObj,
    };
    const req = info.req;
    if (req) {
        const { id, method, url, headers, hostname, httpVersion, socket } = req;
        if (id) {
            ecsFields.event = ecsFields.event || {};
            ecsFields.event.id = id;
        }
        ecsFields.http = ecsFields.http || {};
        ecsFields.http.version = httpVersion;
        ecsFields.http.request = ecsFields.http.request || {};
        ecsFields.http.request.method = method;
        ecsFields.url = ecsFields.url || {};
        ecsFields.url.method = method;
        ecsFields.url.full =
            (socket && socket.encrypted ? "https://" : "http://") +
                headers.host +
                url;
        const hasQuery = url.indexOf("?");
        const hasAnchor = url.indexOf("#");
        if (hasQuery > -1 && hasAnchor > -1) {
            ecsFields.url.path = url.slice(0, hasQuery);
            ecsFields.url.query = url.slice(hasQuery + 1, hasAnchor);
            ecsFields.url.fragment = url.slice(hasAnchor + 1);
        }
        else if (hasQuery > -1) {
            ecsFields.url.path = url.slice(0, hasQuery);
            ecsFields.url.query = url.slice(hasQuery + 1);
        }
        else if (hasAnchor > -1) {
            ecsFields.url.path = url.slice(0, hasAnchor);
            ecsFields.url.fragment = url.slice(hasAnchor + 1);
        }
        else {
            ecsFields.url.path = url;
        }
        if (hostname) {
            const [host, port] = hostname.split(":");
            ecsFields.url.domain = host;
            if (port) {
                ecsFields.url.port = Number(port);
            }
        }
        ecsFields.client = ecsFields.client || {};
        let ip;
        if (req.ip) {
            ip = req.ip;
        }
        else if (socket && socket.remoteAddress) {
            ip = socket.remoteAddress;
        }
        if (ip) {
            ecsFields.client.ip = ecsFields.client.address = ip;
        }
        if (socket) {
            ecsFields.client.port = socket.remotePort;
        }
        const hasHeaders = Object.keys(headers).length > 0;
        if (hasHeaders === true) {
            ecsFields.http.request.headers = Object.assign(ecsFields.http.request.headers || {}, headers);
            const cLen = Number(headers["content-length"]);
            if (!isNaN(cLen)) {
                ecsFields.http.request.body = ecsFields.http.request.body || {};
                ecsFields.http.request.body.bytes = cLen;
            }
            if (headers["user-agent"]) {
                ecsFields.user_agent = ecsFields.user_agent || {};
                ecsFields.user_agent.original = headers["user-agent"];
            }
        }
    }
    if (info.stack) {
        ecsFields.stack = info.stack;
    }
    return ecsFields;
});
const logger = winston.createLogger({
    level: "debug",
    levels: logLevels,
    defaultMeta: {
        service: "tms-chat",
    },
    format: winston.format.combine(winston.format.timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }), ecsFormat({
        convertErr: true,
        convertReqRes: true,
        apmIntegration: false,
    })),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp({
                format: "YYYY-MM-DD hh:mm:ss.SSS A",
            }), logStack(), winston.format.prettyPrint({
                depth: 1,
                colorize: true,
            })),
        }),
        new winston.transports.DailyRotateFile({
            filename: "logs/tms-chat-log-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "debug",
            maxFiles: "7",
        }),
    ],
    exceptionHandlers: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp({
                format: "YYYY-MM-DD hh:mm:ss.SSS A",
            }), logStack(), winston.format.prettyPrint({
                depth: 1,
                colorize: true,
            })),
        }),
        new winston.transports.DailyRotateFile({
            filename: "logs/exceptions-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "debug",
            maxFiles: "7",
        }),
    ],
    rejectionHandlers: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp({
                format: "YYYY-MM-DD hh:mm:ss.SSS A",
            }), logStack(), winston.format.prettyPrint({
                depth: 1,
                colorize: true,
            })),
        }),
        new winston.transports.DailyRotateFile({
            filename: "logs/rejections-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "debug",
            maxFiles: "7",
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=index.js.map