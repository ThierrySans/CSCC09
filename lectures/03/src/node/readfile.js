var fs = require('fs');

fs.readFile('helloworld.txt', 'utf8', function(err, data) {  
    if (err) console.log(err);
    return console.log(data);
});

console.log("hello you!");