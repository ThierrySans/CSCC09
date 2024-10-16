setTimeout(function(){ 
    console.info('1. 5s timeout');
}, 5000);

let a = Array.from({length: 10000000}, () => Math.random());
console.info('2. array created');

a.sort();
console.info('3. array sorted');

console.info('4. done');
