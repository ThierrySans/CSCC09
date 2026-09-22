import { createServer } from "http";
import express from "express";

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

// curl -X POST -d 'content=hello%20world&author=alice' localhost:3000/
app.post("/", function (req, res, next) {
  res.end(req.body.author + " says " + req.body.content);
});

createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
