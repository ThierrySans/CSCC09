import { readFile, writeFile } from "fs"
import { join } from "path";
import { get } from "https";

const bookFile = './books.json';

readFile(bookFile, 'utf8', function (err, data) {
    if (err) return console.err(err);
     const books = JSON.parse(data);
     for (let book of books){
         get(book.url, function (res) {
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
                 writeFile(join('files', book.id), content, function (err) {
                        if (err) return console.error(err);
                });
              });
         });
     }
});