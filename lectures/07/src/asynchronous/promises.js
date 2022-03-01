const fs = require('fs');
const path = require("path");
const request = require('request');

const bookFile = './books.json';

const readFile = function(filepath){
    return new Promise(function(resolve, reject){
        fs.readFile(filepath, 'utf8', function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
};

const fetchFile = function(fileurl, filename){
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

readFile(bookFile).then(function(res){
      let books = JSON.parse(res);
      let lop = books.map(function(book){
          return fetchFile(book.url, book.id);
      });
      return Promise.all(lop);
  })
  .then(function(res){
      console.log(res.length);
  })
  .catch(function(err){
      console.log(err);
  });




