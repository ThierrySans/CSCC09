function foo(data){
    console.log(data);
    document.getElementById("result").innerHTML = data.key;
}

(function(){
    
    window.onload = function(e){
        var script = document.createElement('script');
        script.src = 'http://localhost:3001/api/jsonp/?callback=foo'
        document.body.append(script);
    }
})();