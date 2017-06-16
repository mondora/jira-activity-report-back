import "babel-polyfill";
import bunyanRequest from "bunyan-request";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import api from "api";
import * as config from "config";
import log from "services/logger";

const whitelist = [
    "http://localhost:3000"
];

const corsOptions = {
    origin: (origin, callback) => {
        const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};

export default express()
    .use(bunyanRequest({
        logger: log.child({childName: "request-logger"})
    }))
    .use(cors(corsOptions))
    .use(cookieParser())
    .use(api)
    .listen(config.PORT, () => {
        log.info(`Server listening on port ${config.PORT}`);
    });
