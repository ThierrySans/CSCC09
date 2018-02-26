var api = (function(){
    "use strict";
    
    function send(method, url, data, callback){
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "] " + xhr.responseText, null);
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
    
    module.getCurrentUser = function(){
        var l = document.cookie.split("username=");
        if (l.length > 1) return l[1];
        return null;
    }
    
    module.signin = function (username, password, callback){
        send("POST", "/signin/", {username: username, password: password}, callback);
    }
    
    module.signup = function (username, password, callback){
        send("POST", "/signup/", {username: username, password: password}, callback);
    }
    
    module.addMessage = function (content, callback){
        send("POST", "/api/messages/", {content: content}, callback);
    }
    
    module.getMessages = function (offset, callback){
        send("GET", "/api/messages/?offset=" + offset, null, callback);
    }
    
    module.upvoteMessage = function (messageId, callback){
        send("PATCH", "/api/messages/" + messageId + "/", {action: 'upvote'}, callback);
    }
    
    module.downvoteMessage = function (messageId, callback){
        send("PATCH", "/api/messages/" + messageId + "/", {action: 'downvote'}, callback);
    }
    
    module.deleteMessage = function (messageId, callback){
        send("DELETE", "/api/messages/" + messageId + "/", null, callback);
    }
    
    return module;
})();