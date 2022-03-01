const fs = require('fs');
const path = require("path");
const request = require('request');

const bookFile = './books.json';

fs.readFile(bookFile, 'utf8', function (err, data) {
    if (err) return console.err(err);
     let books = JSON.parse(data);
     for (let book of books){
         request(book.url, function (err, response) {
             if (err) return console.error(err);
             if (response.statusCode !== 200) return console.error("bad request: " + book.url);
             fs.writeFile(path.join(__dirname, 'files', book.id), response.body, function (err) {
                 if (err) return console.error(err);
                 // return console.log(response.body)
             });
         });
     }
});