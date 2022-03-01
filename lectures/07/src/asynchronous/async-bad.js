const hrstart = process.hrtime();

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

async function run() {
    let data = await readFile(bookFile);
    let books = JSON.parse(data);
    for (let book of books){
        await fetchFile(book.url, book.id);
    }
    let hrend = process.hrtime(hrstart);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
};

run().catch(err => console.error(err));



