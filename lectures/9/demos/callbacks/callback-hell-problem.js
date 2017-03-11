var fs = require('fs');
var path = require("path");
var url = require("url");
var exec = require('child_process').exec;
var request = require('request');

const bookFile = '../books.json';

// how to read a file (asynchronously)
// fs.readFile(filename, 'utf8', function (err, data) { ... });

// how to write a file (asynchronously)
// fs.writeFile(filename, data, function (err) { ...});

// how to run a command (asynchronously)
// exec(cmd, function(err, stdout, stderr) { ... });

// how to do an HTTP(S) request (asynchronously)
// request('http://www.google.com', function (error, response) {  ...  });

fs.readFile(bookFile, 'utf8', function (err,data) {
  if (err) return console.log(err);
  var books = JSON.parse(data);
  books.forEach(function(book){
      var fileurl = book.url;
      var filepath = path.join(__dirname, '..', path.dirname(url.parse(book.url).pathname));
      exec("mkdir -p " + filepath, function(err, stdout, stderr) {
          if (err) return console.log(err);
          request(fileurl, function (err, response) {
              if (err) return console.log(err);
              if (response.statusCode !== 200) return console.log(response);
              fs.writeFile(path.join(filepath, 'content.txt'), response.body, function(err) {
                  if (err) return console.log(err);
              });
          });
      });
  });
});


