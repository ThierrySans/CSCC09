import { Worker } from 'worker_threads';

let hrstart = process.hrtime();

// begin timeout
setTimeout(function(){ 
    console.info('5s timeout: %ds', process.hrtime(hrstart)[0]);
}, 5000);

// generating the array 
let a = Array.from({length: 10000000}, () => Math.random());
console.info('Array generated: %ds', process.hrtime(hrstart)[0]);

// sorting the array
const worker = new Worker('./service.mjs', {workerData: a});
worker.on('message', function(res){
    console.info('Array sorted: %ds', process.hrtime(hrstart)[0]);
});
worker.on('error', function(err){
    console.log(err);
    console.info('Error: %ds', process.hrtime(hrstart)[0]);
});
worker.on('exit', (code) => {
    console.info('Thread exit: %ds', process.hrtime(hrstart)[0]);
});
