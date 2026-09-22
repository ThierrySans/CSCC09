import { readFile } from "fs";
import path from "path";

readFile(path.resolve("helloworld.txt"), "utf8", function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});

console.log("Goodbye!");
