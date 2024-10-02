import { createServer } from "http";
import express from "express";
import { serialize, parse } from "cookie";

const PORT = 3000;
const app = express();

// curl -c cookie.txt -b cookie.txt http://localhost:3000/
app.get("/", function (req, res, next) {
  const cookies = parse(req.headers.cookie || "");
  const nbvisits = cookies.nbvisits ? parseInt(cookies.nbvisits) + 1 : 1;
  res.setHeader(
    "Set-Cookie",
    serialize("nbvisits", String(nbvisits), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    }),
  );
  return res.end("You have been visiting this site: " + nbvisits + " times");
});

createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
