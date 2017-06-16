import axios from "axios";

export const path = "/session";
export const method = "post";
export const description = "User login";
export const tags = ["session", "login"];
export const responses = {
    "401": {
        description: "Unauthorized"
    },
    "200": {
        description: "User profile",
        schema: {
            type: "object",
            description: "Login session",
            parameters: {
                name: {
                    type: "string"
                },
                value: {
                    type: "string"
                }
            }
        }
    }
};
export const parameters = [{
    name: "account",
    description: "user account in jira",
    in: "header",
    required: true,
    type: "string"
},
{
    name: "auth",
    in: "body",
    required: true,
    type: "object",
    parameters: {
        username: {
            type: "string"
        },
        password: {
            type: "string"
        }
    }
}];

export async function handler (req, res) {
    const {account} = req.headers;
    const auth = req.body;
    const host = `https://${account}.atlassian.net`;
    try {
        const {data} = await axios.post(`${host}/rest/auth/1/session`, auth, {headers: {"Content-Type": "application/json", "Origin": host}});
        console.log(data);
        res.cookie(data.session.name, data.session.value);
        res.sendStatus(200);
    } catch (e) {
        res.status(401).send("Unauthorized");
    }
}
