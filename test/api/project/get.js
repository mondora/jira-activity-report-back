import express from "express";
import nock from "nock";
import request from "supertest";

import api from "api";

describe("GET /project", () => {

    const server = express().use(api);

    before(() => {
        nock.cleanAll();
    });

    afterEach(() => {
        nock.cleanAll();
    });

    const projectResponse = [{
        "expand": "description,lead,issueTypes,url,projectKeys",
        "self": "https://mondora.atlassian.net/rest/api/2/project/12345",
        "id": "12345",
        "key": "JIR",
        "name": "jira-activity-report",
        "avatarUrls": {
            "48x48": "https://mondora.atlassian.net/secure/projectavatar?pid=12345&avatarId=56",
            "24x24": "https://mondora.atlassian.net/secure/projectavatar?size=small&pid=12345&avatarId=56",
            "16x16": "https://mondora.atlassian.net/secure/projectavatar?size=xsmall&pid=12345&avatarId=56",
            "32x32": "https://mondora.atlassian.net/secure/projectavatar?size=medium&pid=12345&avatarId=56"
        },
        "projectCategory": {
            "self": "https://mondora.atlassian.net/rest/api/2/projectCategory/76543",
            "id": "10300",
            "name": "mondora",
            "description": "All projects related to mondora"
        },
        "projectTypeKey": "software"
    },
    {
        "expand": "description,lead,issueTypes,url,projectKeys",
        "self": "https://mondora.atlassian.net/rest/api/2/project/7654",
        "id": "7654",
        "key": "QOOD",
        "name": "qoodle",
        "avatarUrls": {
            "48x48": "https://mondora.atlassian.net/secure/projectavatar?avatarId=12345",
            "24x24": "https://mondora.atlassian.net/secure/projectavatar?size=small&avatarId=12345",
            "16x16": "https://mondora.atlassian.net/secure/projectavatar?size=xsmall&avatarId=12345",
            "32x32": "https://mondora.atlassian.net/secure/projectavatar?size=medium&avatarId=12345"
        },
        "projectTypeKey": "software"
    }];

    it("400 on missing cookie", () => {
        return request(server)
            .get("/project")
            .set({account: "account"})
            .expect(400);
    });

    it("400 on missing account", () => {
        return request(server)
            .get("/project")
            .set({cookie: "cookie"})
            .expect(400);
    });

    it("500 on api error", () => {
        nock("https://account.atlassian.net")
            .get("/rest/api/2/project")
            .reply(500);
        return request(server)
            .get("/project")
            .set({account: "account", cookie: "cookie"})
            .expect(500);
    });

    it("200 on successfull get all project", () => {
        nock("https://account.atlassian.net")
            .get("/rest/api/2/project")
            .reply(200, projectResponse);
        return request(server)
            .get("/project")
            .set({account: "account", cookie: "cookie"})
            .expect(200, projectResponse);
    });

});
