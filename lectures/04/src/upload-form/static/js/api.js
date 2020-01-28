let api = (function(){
    "use strict";
    
    let module = {};
    
    function send(method, url, data, callback){
        let xhr = new XMLHttpRequest();
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

    let getUsers = function(callback){
        send("GET", "/api/users/", null, callback);
    };
    
    let userListeners = [];
    
    function notifyUserListeners(){
        getUsers(function(err, res){
            if (err) return notifyErrorListeners(err);
            userListeners.forEach(function(listener){
                listener(res);
            });
        });        
    };
    
    module.onUserUpdate = function(listener){
        userListeners.push(listener);
        getUsers(function(err, res){
            if (err) return notifyErrorListeners(err);
            listener(res);
        });
    };
    
    let errorListeners = [];
    
    function notifyErrorListeners(err){
        errorListeners.forEach(function(listener){
            listener(err);
        });
    };
    
    module.onError = function(listener){
        errorListeners.push(listener);
    };
    
    (function refresh(){
        setTimeout(function(e){
            notifyUserListeners();
            refresh();
        }, 2000);
    }());
    
    
    return module;
}());