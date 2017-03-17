var api = (function(){
    "use strict";
    
    var api = {};
    
    var fetch = function(method, url, options, callback){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                if (xhr.status !== 200) return callback(xhr.responseText, null);
                return callback(null, xhr.responseText);
            }
        };
        xhr.open(method, url, true);
        if (options.headers){
            Object.keys(options.headers).map(function(header){
                    xhr.setRequestHeader(header, options.headers[header]);
            });
        }
        xhr.send(options.body? options.body : null);
    }
    
    api.addMessage = function(message, callback){
        var options = {};
        options.headers = {};
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(message); 
        fetch('POST', '/api/messages/', options, function(err,data){
            if (err) return callback(err,null);
            callback(null, JSON.parse(data));
        });  
    }
    
    api.getMessages = function(callback){
        fetch('GET', '/api/messages/', {}, function(err,data){
            if (err) return callback(err,null);
            callback(null, JSON.parse(data));
        });
    }
    
    return api;
    
})();
