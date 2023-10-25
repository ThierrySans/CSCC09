function foo(){
    return new Promise(function(resolve, reject){
        console.log('1. promise is executed')
        return resolve();
    })
}

foo().then(function(){
    console.log('2. promise has been resolved');
});

console.log('3. program terminates')