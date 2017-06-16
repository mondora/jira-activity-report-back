import axios from "axios";

export const path = "/board/:boardId/sprint";
export const method = "get";
export const description = "Returns all sprints from a board";
export const tags = ["sprint"];
export const responses = {
    "400": {
        description: "Bad request"
    },
    "200": {
        description: "Sprint",
        schema: {
            title: "List of sprints",
            type: "array"
        }
    }
};
export const parameters = [{
    name: "account",
    description: "User account in jira",
    in: "header",
    required: true,
    type: "string"
}, {
    name: "cookie",
    description: "cookie",
    in: "header",
    required: true,
    type: "string"
}, {
    name: "boardId",
    description: "boardId",
    in: "path",
    required: true,
    type: "string"
}];

export async function handler (req, res) {
    const {account, cookie} = req.headers;
    const {boardId} = req.params;
    const host = `https://${account}.atlassian.net`;
    try {
        const {data} = await axios.get(`${host}/rest/agile/1.0/board/${boardId}/sprint`, {headers: {cookie}});
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send("Internal server error");
    }
}
