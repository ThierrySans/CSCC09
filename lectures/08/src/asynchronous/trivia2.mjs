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

p.then(function(){
    console.info('4. promise resolved');
})

console.info('5. done');
