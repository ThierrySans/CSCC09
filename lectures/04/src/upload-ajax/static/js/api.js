var api = (function(){
    "use strict";
    
    var module = {};
    
    function sendFiles(method, url, data, callback){
        var formdata = new FormData();
        Object.keys(data).forEach(function(key){
            var value = data[key];
            formdata.append(key, value);
        });
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        xhr.send(formdata);
    }
    
    function send(method, url, data, callback){
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        if (!data) xhr.send();
        else{
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }

    module.getUsers = function(callback){
        send("GET", "/api/users/", null, callback);
    }

    module.addUser = function(username, picture, callback){
        sendFiles("POST", "/api/users/", {username: username, picture: picture}, callback);
    }
    
    return module;
}());