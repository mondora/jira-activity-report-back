import {createLogger} from "bunyan";

import {LOG_LEVEL, NODE_ENV} from "../config";

export default createLogger({
    name: "jira-activity-report-back",
    streams: NODE_ENV === "test" ? [] : [{
        level: LOG_LEVEL,
        stream: process.stdout
    }]
});
