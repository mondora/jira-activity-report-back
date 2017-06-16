import axios from "axios";

export const path = "/board";
export const method = "get";
export const description = "Get board";
export const tags = ["board"];
export const responses = {
    "400": {
        description: "Bad request"
    },
    "200": {
        description: "Board",
        schema: {
            title: "List of board",
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
}];

export async function handler (req, res) {
    const {account, cookie} = req.headers;
    const host = `https://${account}.atlassian.net`;
    try {
        const {data} = await axios.get(`${host}/rest/agile/1.0/board`, {headers: {cookie}});
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
}
