import { createServer } from "http";
import express from "express";

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("static"));

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.post("/uri", function (req, res, next) {
  res.end("The server has received: " + req.body.content);
});

app.post("/json", function (req, res, next) {
  res.json("The server has received: " + req.body.content);
});

createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
