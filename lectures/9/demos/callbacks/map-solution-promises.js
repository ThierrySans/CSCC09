var fs = require('fs');
var path = require("path");
var url = require("url");
var request = require('request');

const bookFile = '../books.json';

var readFile = function(fileurl){
    var filepath = path.join(__dirname, '..', path.dirname(url.parse(fileurl).pathname));
    return new Promise(function(resolve, reject){
        fs.readFile(path.join(filepath, 'content.txt'), 'utf8', function(err, data){
            if (err) return reject(err);
            return resolve(data);
        });
    });
};

var fetchFile = function(fileurl){
    return new Promise(function(resolve, reject){
        request(fileurl, function (err, response) {
            if (err) return reject(err);
            if (response.statusCode !== 200) return reject("bad request");
            return resolve(response.body);
        });
    });
};

fs.readFile(bookFile, 'utf8', function (err, data) {
  if (err) return console.log(err);
  var books = JSON.parse(data);
  
  // readFile(books[0].url).then(function(data){
  //     console.log(data);
  // }).catch(function(err){
  //     console.log(err);
  // });

  var pList = books.map(function(book){
         return readFile(book.url);
  });
  Promise.all(pList).then(function(data){
      console.log(data);
  }).catch(function(err){
      console.log(err);
  });
});


