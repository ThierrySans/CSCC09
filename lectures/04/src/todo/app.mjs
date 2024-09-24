import { rmSync } from "fs";
import { join } from "path";
import { createServer } from "http";
import express from "express";
import Datastore from "nedb";

const PORT = 3000;
const app = express();

app.use(express.json());

let items = new Datastore({
  filename: join("db", "items.db"),
  autoload: true,
  timestampData: true,
});

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.get("/api/items/", function (req, res, next) {
    const limit = Math.max(5, (req.query.limit)? parseInt(req.query.limit) : 5);
    const page = (req.query.page) || 0;
  items
    .find({})
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit)
    .exec(function (err, items) {
      if (err) return res.status(500).end(err);
      return res.json(items.reverse());
    });
});

app.post("/api/items/", function (req, res, next) {
  items.insert({ content: req.body.content }, function (err, item) {
    if (err) return res.status(500).end(err);
    return res.json(item);
  });
});

app.get("/api/items/:id/", function (req, res, next) {
  items.findOne({ _id: req.params.id }, function (err, item) {
    if (err) return res.status(500).end(err);
    if (!item)
      return res
        .status(404)
        .end("Item id #" + req.params.id + " does not exists");
    return res.json(item);
  });
});

app.delete("/api/items/:id/", function (req, res, next) {
  items.findOne({ _id: req.params.id }, function (err, item) {
    if (err) return res.status(500).end(err);
    if (!item)
      return res
        .status(404)
        .end("Item id #" + req.params.id + " does not exists");
    items.remove({ _id: item._id }, { multi: false }, function (err, num) {
      res.json(item);
    });
  });
});

app.use(express.static("static"));

// This is for testing purpose only
export function createTestDb(db) {
  items = new Datastore({
    filename: join("testdb", "items.db"),
    autoload: true,
    timestampData: true,
  });
}

// This is for testing purpose only
export function deleteTestDb(db) {
  rmSync("testdb", { recursive: true, force: true });
}

// This is for testing purpose only
export function getItems(callback) {
  return items
    .find({})
    .sort({ createdAt: -1 })
    .exec(function (err, items) {
      if (err) return callback(err, null);
      return callback(err, items.reverse());
    });
}

export const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
