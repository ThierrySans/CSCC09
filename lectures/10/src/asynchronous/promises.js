var fs = require('fs');
var path = require("path");
var request = require('request');

const bookFile = './books.small.json';

var readFile = function(filepath){
    return new Promise(function(resolve, reject){
        fs.readFile(filepath, 'utf8', function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
};

var fetchFile = function(fileurl, filename){
    return new Promise(function(resolve, reject){
        request(fileurl, function (err, response) {
            if (err) return reject(err);
            if (response.statusCode !== 200) return reject("bad request: " + fileurl);
            fs.writeFile(path.join(__dirname, 'files', filename), response.body, function (err) {
                if (err) return reject(err);
                return resolve(response.body)
            });
        });
    })
};

readFile(bookFile)
  .then(function(res){
      var books = JSON.parse(res);
      var lop = books.map(function(book, i){
          return fetchFile(book.url, i.toString());
      });
      return Promise.all(lop);
  })
  .then(function(res){
      console.log(res.length);
  })
  .catch(function(err){
      console.log(err);
  });




