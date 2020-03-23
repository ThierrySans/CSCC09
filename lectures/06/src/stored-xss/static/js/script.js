(function(){
    
    var send = function(method, data, callback){
        var data = document.getElementById("inputForm").value;
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            callback(null, this.responseText);
        };
        xhr.open(method, "/api/", true);
        xhr.send((data)? data : null);
    }
    
    document.getElementById("ajaxForm").onsubmit = function(e){
        e.preventDefault();
        var data = document.getElementById("inputForm").value;
        send("POST", data, function(err, data) {
                send("GET", null, function(err, data){
                    document.write(data);
                });
        });
        
    }
}())

