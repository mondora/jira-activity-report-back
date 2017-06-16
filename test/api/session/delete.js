import express from "express";
import nock from "nock";
import request from "supertest";

import api from "api";

describe("DELETE /session", () => {

    const server = express().use(api);

    before(() => {
        nock.cleanAll();
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it("400 on missing cookie", () => {
        nock("https://account.atlassian.net")
            .delete("/rest/auth/1/session")
            .reply(401);
        return request(server)
            .delete("/session")
            .set({account: "account"})
            .expect(400);
    });

    it("400 on missing account", () => {
        nock("https://account.atlassian.net")
            .delete("/rest/auth/1/session")
            .reply(401);
        return request(server)
            .delete("/session")
            .set({cookie: "cookie"})
            .expect(400);
    });

    it("401 on missing authentication", () => {
        nock("https://account.atlassian.net")
            .delete("/rest/auth/1/session")
            .reply(401);
        return request(server)
            .delete("/session")
            .set({account: "account", cookie: "cookie"})
            .expect(401)
            .expect("Unauthorized");
    });

    it("204 on successfull logout", () => {
        nock("https://account.atlassian.net")
            .delete("/rest/auth/1/session")
            .reply(204);
        return request(server)
            .delete("/session")
            .set({account: "account", cookie: "cookie"})
            .expect(204);
    });

});
