setTimeout(function(){ 
    console.info('1. 5s timeout');
}, 5000);

let a = Array.from({length: 10000000}, () => Math.random());
console.info('2. array created');

const p = new Promise(function(resolve, reject){
    a.sort();
    console.info('3. array sorted');
    resolve();
});

await p;
console.info('4. await done');

console.info('5. done');
