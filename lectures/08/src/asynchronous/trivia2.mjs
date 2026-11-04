
setTimeout(function(){ 
    console.info('1. 5s timeout');
}, 5000);

let a = Array.from({length: 10000000}, () => Math.random());
console.info('2. array created');

const p = new Promise(function(resolve, reject){
    console.log("3. Readfile begin")
    readFile('/path/to/file', function(err, res){
        console.log("4. Readfile end")
        if (err) return reject(err);
        else return resolve(res);
    })
});

p.catch(function(){
    console.info('5. promise resolved');
})

console.info('6. done');
