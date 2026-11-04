import { readFile } from "fs"
import { Worker } from "worker_threads";

const bookFile = './books.json';

process.setMaxListeners(100);

function read (filepath){
    return new Promise(function(resolve, reject){
     readFile(filepath, 'utf8', function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        })
    })
}

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./service.mjs', { workerData } );
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function run() {
    let data = await read(bookFile);
    let books = JSON.parse(data);
    let lop = books.map(function(book, i){
        return runService({fileurl: book.url, filename: i.toString()});
    });
    try {
        let results = await Promise.all(lop);
        console.log(results.length);
    } catch (err){
        console.log(err);
    }
}

run().catch(err => console.error(err));