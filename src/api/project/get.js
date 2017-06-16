import axios from "axios";

export const path = "/project";
export const method = "get";
export const description = "Get all project for user";
export const tags = ["project"];
export const responses = {
    "400": {
        description: "Bad request"
    },
    "200": {
        description: "Project",
        schema: {
            title: "List of Project",
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
        const {data} = await axios.get(`${host}/rest/api/2/project`, {headers: {cookie}});
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send("Bad request");
    }
}
