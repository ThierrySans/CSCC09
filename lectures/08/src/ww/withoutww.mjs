const hrstart = process.hrtime();

// begin timeout
setTimeout(function(){ 
    console.info('5s timeout: %ds', process.hrtime(hrstart)[0]);
}, 5000);

// generating the array 
let a = Array.from({length: 10000000}, () => Math.random());
console.info('Array generated: %ds', process.hrtime(hrstart)[0]);

// sorting the array
a.sort();
console.info('Array sorted: %ds', process.hrtime(hrstart)[0]);
