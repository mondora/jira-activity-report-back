import express from "express";
import nock from "nock";
import request from "supertest";

import api from "api";

describe("GET /sprint", () => {

    const server = express().use(api);

    before(() => {
        nock.cleanAll();
    });

    afterEach(() => {
        nock.cleanAll();
    });

    const sprintResponse = [{
        "maxResults": 50,
        "startAt": 0,
        "isLast": true,
        "values": [
            {
                "id": 200,
                "self": "https://mondora.atlassian.net/rest/agile/1.0/sprint/200",
                "state": "closed",
                "name": "JIR Sprint 1",
                "startDate": "2017-05-24T11:17:42.314+02:00",
                "endDate": "2017-06-01T10:30:00.000+02:00",
                "completeDate": "2017-06-08T10:04:23.429+02:00",
                "originBoardId": 104,
                "goal": ""
            },
            {
                "id": 206,
                "self": "https://mondora.atlassian.net/rest/agile/1.0/sprint/206",
                "state": "active",
                "name": "JIR Sprint 2",
                "startDate": "2017-06-08T10:06:39.337+02:00",
                "endDate": "2017-06-15T10:06:00.000+02:00",
                "originBoardId": 104,
                "goal": ""
            }
        ]
    }];

    it("400 on missing cookie", () => {
        return request(server)
            .get("/board/boardId/sprint")
            .set({account: "account"})
            .expect(400);
    });

    it("400 on missing account", () => {
        return request(server)
            .get("/board/boardId/sprint")
            .set({cookie: "cookie"})
            .expect(400);
    });

    it("500 on api error", () => {
        nock("https://account.atlassian.net")
            .get("/rest/agile/1.0/board/boardId/sprint")
            .reply(500);
        return request(server)
            .get("/board/boardId/sprint")
            .set({account: "account", cookie: "cookie"})
            .expect(500);
    });

    it("200 on successfull get all sprint", () => {
        nock("https://account.atlassian.net")
            .get("/rest/agile/1.0/board/boardId/sprint")
            .reply(200, sprintResponse);
        return request(server)
            .get("/board/boardId/sprint")
            .set({account: "account", cookie: "cookie"})
            .expect(200, sprintResponse);
    });

});
