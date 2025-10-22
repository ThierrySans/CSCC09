import { writeFile } from "fs"
import { join } from "path";
import { get } from "https";

import { workerData, parentPort } from 'worker_threads';


get(workerData.fileurl, function (res) {
     if (res.statusCode !== 200) return console.error("bad request: " + book.url);
     const data = [];
     
     res.on('error', function(err){
         console.error(err);
     })
     
     res.on('data', function(chunk){
         data.push(chunk);
     });
     
     res.on('end', () => {
         const content = Buffer.concat(data).toString();
         writeFile(join('files', workerData.filename), content, function (err) {
                if (err) return console.error(err);
                parentPort.postMessage(content);
        });
      });
});