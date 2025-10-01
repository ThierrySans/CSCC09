import { createServer } from "http";
import express from "express";
import session from "express-session";

const PORT = 3000;
const app = express();

app.use(
  session({
    secret: "please change this secret",
    resave: false,
    saveUninitialized: true,
  }),
);

// curl -c cookie.txt -b cookie.txt http://localhost:3000/
app.get("/", function (req, res, next) {
  const nbvisits = req.session.nbvisits ? req.session.nbvisits + 1 : 1;
  req.session.nbvisits = nbvisits;
  return res.end("You have been visiting this site: " + nbvisits + " times");
});

createServer(app).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
