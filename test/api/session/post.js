import express from "express";
import nock from "nock";
import request from "supertest";

import api from "api";

describe("POST /session", () => {

    const server = express().use(api);

    before(() => {
        nock.cleanAll();
    });

    afterEach(() => {
        nock.cleanAll();
    });

    const auth = {username: "username", password: "password"};

    it("400 on missing account", () => {
        nock("https://account.atlassian.net")
            .post("/rest/auth/1/session")
            .reply(401);
        return request(server)
            .post("/session")
            .expect(400);
    });

    it("401 on missing authentication", () => {
        nock("https://account.atlassian.net")
            .post("/rest/auth/1/session", auth)
            .reply(401);
        return request(server)
            .post("/session")
            .set({account: "account"})
            .send(auth)
            .expect(401)
            .expect("Unauthorized");
    });

    it("200 on successfull login", () => {
        nock("https://account.atlassian.net")
            .post("/rest/auth/1/session", auth)
            .reply(200, {name: "name", value: "value"});
        return request(server)
            .post("/session")
            .set({account: "account"})
            .send({username: "username", password: "password"})
            .expect(200)
            .expect({name: "name", value: "value"});
    });

});
