import { readFile, writeFile } from "fs"
import { join } from "path";
import { get } from "https";

const bookFile = './books.json';

function read(filepath){
    return new Promise(function(resolve, reject){
        readFile(filepath, 'utf8', function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
};

function fetch(fileurl){
    return new Promise(function(resolve, reject){
        get(fileurl, function (res) {
            if (res.statusCode !== 200) return reject(new Error(`Bad request: ${book.url}`));
            const data = [];
            
            res.on('error', function(err){
                return reject(err);
            })
            
            res.on('data', function(chunk){
                data.push(chunk);
            });
            
            res.on('end', () => {
                const content = Buffer.concat(data).toString();
                return resolve(content);
             });
        });
    })
};

function write(filename, content){
    return new Promise(function(resolve, reject){
        writeFile(join('files', filename), content, function (err) {
            if (err) return reject(err);
            return resolve();
        });
    })
}

async function run() {
    let data = await read(bookFile);
    let books = JSON.parse(data);
    let lop = books.map(function(book){
        return fetch(book.url).then(function(content){
            return write(book.id, content)
        })
    });
    let results = await Promise.all(lop);
    console.log(results.length);
};

run().catch(err => console.error(err));