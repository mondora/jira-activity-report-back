import express from "express";
import nock from "nock";
import request from "supertest";

import api from "api";

describe("GET /board", () => {

    const server = express().use(api);

    before(() => {
        nock.cleanAll();
    });

    afterEach(() => {
        nock.cleanAll();
    });

    const boardResponse = [{
        "maxResults": 50,
        "startAt": 0,
        "isLast": true,
        "values": [
            {
                "id": 104,
                "self": "https://mondora.atlassian.net/rest/agile/1.0/board/104",
                "name": "JIR board",
                "type": "scrum"
            },
            {
                "id": 105,
                "self": "https://mondora.atlassian.net/rest/agile/1.0/board/105",
                "name": "QOOD board",
                "type": "kanban"
            }
        ]
    }];

    it("400 on missing cookie", () => {
        return request(server)
            .get("/board")
            .set({account: "account"})
            .expect(400);
    });

    it("400 on missing account", () => {
        return request(server)
            .get("/board")
            .set({cookie: "cookie"})
            .expect(400);
    });

    it("500 on api error", () => {
        nock("https://account.atlassian.net")
            .get("/rest/agile/1.0/board")
            .reply(500);
        return request(server)
            .get("/board")
            .set({account: "account", cookie: "cookie"})
            .expect(500);
    });

    it("200 on successfull get all board", () => {
        nock("https://account.atlassian.net")
            .get("/rest/agile/1.0/board")
            .reply(200, boardResponse);
        return request(server)
            .get("/board")
            .set({account: "account", cookie: "cookie"})
            .expect(200, boardResponse);
    });

});
