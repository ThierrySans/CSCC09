import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();

app.use(bodyParser.text({ type: "*/*" }));

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

// curl -X POST -d "hello world" localhost:3000/
app.post("/", function (req, res, next) {
  res.end(req.body);
});

createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
