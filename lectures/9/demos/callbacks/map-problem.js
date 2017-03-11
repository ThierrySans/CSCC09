var fs = require('fs');
var path = require("path");
var url = require("url");
var request = require('request');

const bookFile = '../books.json';

var fetchFile = function(fileurl, callback){
    request(fileurl, function (err, response) {
        if (err) return callback(err, null);
        if (response.statusCode !== 200) return callback("bad request",null);
        return callback(null, response.body);
    });
};

var readFile = function(fileurl, callback){
    var filepath = path.join(__dirname, '..', path.dirname(url.parse(fileurl).pathname));
    fs.readFile(path.join(filepath, 'content.txt'), 'utf8', callback);
};

// read the bookfile
fs.readFile(bookFile, 'utf8', function (err, data) {
  if (err) return console.log(err);
  var books = JSON.parse(data);
  var result = [];
  books.forEach(function(book){
      fetchFile(book.url, function (err,data) {
          if (err) console.log(err);
          else result.push(data);
      });
  });
  // console.log(result);
  setTimeout(function(){
      console.log(result.length);
  }, 10000);
});


