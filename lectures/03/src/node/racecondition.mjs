const PORT = 3000;

import { createServer } from "http";

let g_var = 0;

function handleRequest(request, response) {
  let c_var = g_var + 1;
  setTimeout(function () {
    g_var = g_var + 1;
    console.log(c_var, g_var);
    response.end("Welcome race conditions!");
  }, 500);
}

// for i in {1..10}; do curl http://localhost:3000/ & done
createServer(handleRequest).listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
