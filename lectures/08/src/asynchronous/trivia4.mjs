setTimeout(function(){ 
    console.info('1. 5s timeout');
}, 5000);


let a = Array.from({length: 10000000}, () => Math.random());
console.info('2. array created');

async function sort(){
	a.sort();
    console.info('3. array sorted');
}

(async function(){
  console.info('4. await start');
	await sort();
	console.info('5. await done');
}());

console.log('6. done');