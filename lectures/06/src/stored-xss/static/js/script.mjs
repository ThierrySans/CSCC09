function send(method, data, callback){
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){
        callback(null, this.responseText);
    };
    xhr.open(method, "/api/", true);
    xhr.send((data)? data : null);
}

document.getElementById("ajaxForm").onsubmit = function(e){
    e.preventDefault();
    const data = document.getElementById("inputForm").value;
    send("POST", data, function(err, data) {
            send("GET", null, function(err, res){
                document.write(res);
            });
    });   
}

