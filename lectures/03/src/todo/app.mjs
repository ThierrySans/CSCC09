import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

let Item = (function () {
  let id = 0;
  return function item(item) {
    this.id = id++;
    this.content = item.content;
  };
})();

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

let items = [];

app.get("/api/items/", function (req, res, next) {
  res.json(items);
});

app.post("/api/items/", function (req, res, next) {
  let item = new Item(req.body);
  items.push(item);
  res.json(item);
});

app.get("/api/items/:id/", function (req, res, next) {
  res.json(items[req.params.id]);
});

app.delete("/api/items/:id/", function (req, res, next) {
  let index = items.findIndex(function (e) {
    return e.id === parseInt(req.params.id);
  });
  if (index === -1) res.json(null);
  else {
    let item = items[index];
    items.splice(index, 1);
    res.json(item);
  }
});

app.use(express.static("static"));

export const server = createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
