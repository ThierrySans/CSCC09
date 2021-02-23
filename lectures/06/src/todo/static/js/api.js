var api = (function(){
    "use strict";
    
    var module = {};
    
    module.getCurrentUser = function(){
        var username = document.cookie.split("username=")[1];
        if (username.length == 0) return null;
        return username;
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

    module.addItem = function(content){
        send("POST", "/api/items/", {content: content}, function(err, res){
             if (err) return notifyErrorListeners(err);
             notifyItemListeners();
        });
    };
    
    module.deleteItem = function(itemId){
        send("DELETE", "/api/items/" + itemId + "/", null, function(err, res){
            if (err) return notifyErrorListeners(err);
            notifyItemListeners();
        });
    };

    let getItems = function(callback){
        send("GET", "/api/items/", null, callback);
    };
    
    let itemListeners = [];
    
    // notify all item listeners
    function notifyItemListeners(){
        getItems(function(err, res){
            if (err) return notifyErrorListeners(err);
            itemListeners.forEach(function(listener){
                listener(res);
            });
        });        
    };
    
    // register an item listener
    module.onItemUpdate = function(listener){
        itemListeners.push(listener);
        getItems(function(err, res){
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
            notifyItemListeners();
            refresh();
        }, 2000);
    }());
    
    
    return module;
}());