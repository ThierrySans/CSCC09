var api = (function(){
    "use strict";
    
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
    
    var module = {};
    
    module.getUsers = function(callback){
        send("GET", "/api/users/", null, callback);
    }
    
    module.addUser = function(username, picture, callback){
        send("POST", "/api/users/", {username: username}, callback);
    }
    
    module.addMessage = function(username, content, callback){
        send("POST", "/api/messages/", {username: username, content: content}, callback);
    }
    
    module.getMessages = function(offset, callback){
        send("GET", "/api/messages/?offset=" + offset, null, callback);
    }
    
    module.upvoteMessage = function(messageId, callback){
        send("PATCH", "/api/messages/" + messageId + "/", {action: 'upvote'}, callback);
    }
    
    module.downvoteMessage = function(messageId, callback){
        send("PATCH", "/api/messages/" + messageId + "/", {action: 'downvote'}, callback);
    }
    
    module.deleteMessage = function(messageId, callback){
        send("DELETE", "/api/messages/" + messageId + "/", null, callback);
    }
    
    return module;
})();