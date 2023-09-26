import { readFileSync } from "fs";
import chai from "chai";
import chaiHttp from "chai-http";

import { server, createTestDb, deleteTestDb, getItems } from "../app.mjs";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Testing Static Files", () => {
  after(function () {
    server.close();
  });

  it("it should get index.html", function (done) {
    chai
      .request(server)
      .get("/")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal(
          readFileSync("./static/index.html", "utf-8"),
        );
        done();
      });
  });
});

describe("Testing API", () => {
  const testData = [
    "The quick brown Fox jumps over the lazy Dog",
    "A man, a plan, a canal – Panama",
  ];

  before(function () {
    createTestDb();
  });

  after(function () {
    deleteTestDb();
    server.close();
  });

  it("it should add an item", function (done) {
    chai
      .request(server)
      .post("/api/items")
      .set("content-type", "application/json")
      .send({ content: testData[0] })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("content", testData[0]);
        getItems(function (err, items) {
          if (err) return done(err);
          expect(items).to.have.length(1);
          expect(items[0]).to.have.property("content", testData[0]);
          done();
        });
      });
  });

  it("it should add another item", function (done) {
    const content = "Hello World!";
    chai
      .request(server)
      .post("/api/items")
      .set("content-type", "application/json")
      .send({ content: testData[1] })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("content", testData[1]);
        getItems(function (err, items) {
          if (err) return done(err);
          expect(items).to.have.length(2);
          expect(items[1]).to.have.property("content", testData[1]);
          done();
        });
      });
  });

  it("it should get all items", function (done) {
    chai
      .request(server)
      .get("/api/items")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property("content", testData[0]);
        expect(res.body[1]).to.have.property("content", testData[1]);
        done();
      });
  });

  it("it should delete an item", function (done) {
    getItems(function (err, items) {
      chai
        .request(server)
        .delete(`/api/items/${items[0]._id}/`)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("content", testData[0]);
          getItems(function (err, items) {
            if (err) return done(err);
            expect(items).to.have.length(1);
            expect(items[0]).to.have.property("content", testData[1]);
            done();
          });
        });
    });
  });

  it("it should get the remaining items", function (done) {
    chai
      .request(server)
      .get("/api/items")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property("content", testData[1]);
        done();
      });
  });
});
