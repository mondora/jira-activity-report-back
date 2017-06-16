import axios from "axios";

export const path = "/session";
export const method = "delete";
export const description = "User logout";
export const tags = ["session", "logout"];
export const responses = {
    "401": {
        description: "Unauthorized"
    },
    "204": {
        description: "Returned if the user was successfully logged out"
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
        await axios.delete(`${host}/rest/auth/1/session`, {headers: {"Content-Type": "application/json", "Origin": host, cookie}});
        res.sendStatus(204);
    } catch (e) {
        res.status(401).send("Unauthorized");
    }
}
