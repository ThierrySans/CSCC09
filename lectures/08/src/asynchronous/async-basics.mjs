async function foo(){
    console.log('1. async is executed')
    return;
}

(async function(){
    await foo();
    console.log('2. async has been resolved')
}());

console.log('3. program terminates');