var api = (function(){
    "use strict";
    
    var module = {};
    
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
    
    module.getCurrentUser = function(){
        var username = document.cookie.split("username=")[1];
        if (username.length == 0) return null;
        return username;
    }

    module.getItems = function(callback){
        send("GET", "/api/items/", null, callback);
    }

    module.addItem = function(content, callback){
        send("POST", "/api/items/", {content: content}, callback);
    }
    
    module.deleteItem = function(itemId, callback){
        send("DELETE", "/api/items/" + itemId + "/", null, callback);
    }
    
    return module;
}());