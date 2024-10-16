setTimeout(function(){ 
    console.info('1. 5s timeout');
}, 5000);


let a = Array.from({length: 10000000}, () => Math.random());
console.info('2. array created');

async function sort(){
	a.sort();
}

(async function(){
	await sort();
	console.info('3. array sorted');
}());

console.log('4. done');