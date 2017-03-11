var fs = require('fs');
var path = require("path");
var url = require("url");
var exec = require('child_process').exec;
var request = require('request');
var async = require('async');


const bookFile = '../books.json';

var createDirectory = function(file, callback){
    exec("mkdir -p " + file.filepath, function(err, stdout, stderr) {
        if (err) return callback(err, null);
        return callback(null, file);
    });
};

var fetchFile = function(file, callback){
    request(file.url, function (err, response) {
        if (err) return callback(err, null);
        if (response.statusCode !== 200) return callback(response, null);
        file.content = response.body;
        return callback(null, file)
    });
};

var writeFile = function(file, callback){
    fs.writeFile(path.join(file.filepath, 'content.txt'), file.content, function(err) {
        if (err) return console.log(err);
        callback(null, file);
    });
};

fs.readFile(bookFile, 'utf8', function (err,data) {
  if (err) return console.log(err);
  var books = JSON.parse(data);
  books.forEach(function(book){
      book.filepath = path.join(__dirname, '..', path.dirname(url.parse(book.url).pathname));
      var init = function(callback){callback(null, book);}
      async.waterfall([init, createDirectory, fetchFile, writeFile], function(err,data){
          if (err) console.log(err);
      });
  });
});


