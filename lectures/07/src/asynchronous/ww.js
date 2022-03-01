const hrstart = process.hrtime();

const fs = require('fs');

const bookFile = './books.json';

const { Worker } = require('worker_threads');
process.setMaxListeners(100);

const readFile = function(filepath){
    return new Promise(function(resolve, reject){
        fs.readFile(filepath, 'utf8', function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
};

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./service.js', { workerData } );
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function run() {
    let data = await readFile(bookFile);
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
    let hrend = process.hrtime(hrstart);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
}

run().catch(err => console.error(err));