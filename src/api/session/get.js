import axios from "axios";

export const path = "/session";
export const method = "get";
export const description = "User info";
export const tags = ["session", "user info"];
export const responses = {
    "401": {
        description: "Unauthorized"
    },
    "200": {
        description: "User name",
        schema: {
            type: "string"
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
        const {data} = await axios.get(`${host}/rest/auth/1/session`, {headers: {cookie}});
        res.status(200).send(data.name);
    } catch (e) {
        res.status(401).send("Unauthorized");
    }
}
