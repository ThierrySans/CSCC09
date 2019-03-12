var fs = require('fs');
var path = require("path");
var request = require('request');

const bookFile = './books.json';

fs.readFile(bookFile, 'utf8', function (err, data) {
    if (err) return console.err(err);
     var books = JSON.parse(data);
     for (let i in books){
         let book = books[i];
         console.log(book);
         request(book.url, function (err, response) {
             if (err) return console.err(err);
             if (response.statusCode !== 200) return reject("bad request: " + book.url);
             fs.writeFile(path.join(__dirname, 'files', i), response.body, function (err) {
                 if (err) return console.err(err);
                 return console.log(response.body)
             });
         });
     }
});