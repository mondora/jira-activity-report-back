import convexpress from "convexpress";

import * as config from "config";

const options = {
    info: {
        title: "jira-activity-report-back",
        version: "1.0.0"
    },
    host: config.HOST,
    basePath: config.BASE_PATH
};
export default convexpress(options)
    .serveSwagger()
    .convroute(require("api/session/delete"))
    .convroute(require("api/session/get"))
    .convroute(require("api/session/post"))
    .convroute(require("api/project/get"))
    .convroute(require("api/board/get"))
    .convroute(require("api/board/{boardId}/sprint/get"));
