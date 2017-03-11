var fs = require('fs');
var path = require("path");
var url = require("url");
var request = require('request');
var async = require('async');

const bookFile = '../books.small.json';

var readFile = function(fileurl, callback){
    var filepath = path.join(__dirname, '..', path.dirname(url.parse(fileurl).pathname));
    fs.readFile(path.join(filepath, 'content.txt'), 'utf8', callback);
};

var fetchFile = function(fileurl, callback){
    request(fileurl, function (err, response) {
        if (err) return callback(err, null);
        if (response.statusCode !== 200) return callback("bad request",null);
        return callback(null, response.body);
    });
};

// read the bookfile
fs.readFile(bookFile, 'utf8', function (err, data) {
  if (err) return console.log(err);
  var books = JSON.parse(data);
  async.map(books, function(book, callback){
      fetchFile(book.url, callback);
  }, function(err, data){
      if (err) console.log(err);
      else console.log(data.length);
  });
});
