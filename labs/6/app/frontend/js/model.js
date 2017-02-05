var model = (function(){
    "use strict";
    
    var activeUser;
    
    var doAjax = function (method, url, body, json, callback){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(e){
            switch(this.readyState){
                 case (XMLHttpRequest.DONE):
                    if (this.status === 200) {
                        if(json) return callback(null, JSON.parse(this.responseText));
                        return callback(null, this.responseText);
                    }else{
                        return callback(this.responseText, null);
                    }
            }
        };
        xhttp.open(method, url, true);
        if (json && body){
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.send(JSON.stringify(body));  
        }else{
            xhttp.send(body);  
        }        
    };
    
    var model = {};
    
    // init

    model.init = function (){
        model.getMessages();
    }
    
    // signUp, signIn and signOut
    
    model.signOut = function(callback){
        doAjax('DELETE', '/signout/', null, false, callback);
    }
    
    model.signIn = function(data, callback){
        doAjax('POST', '/signin/', data, true, function(err, user){
            if (err) return callback(err, null);
            activeUser = user;
            callback(null, user);
        });
    }
    
    model.signUp = function(data, callback){
        doAjax('PUT', '/api/users/', data, true, callback);
    }
    
   // create
    
    model.createMessage = function (data, callback){
        data.username = activeUser.username;
        doAjax('POST', '/api/messages/', data, true, callback);
    };
    
    // read
    
    model.getMessages = function (callback){
        doAjax("GET", "/api/messages/", null, true, callback);
    };
    
    // update
    
    model.updateUser = function (data, callback){
        var formdata = new FormData();
        formdata.append("picture", data.picture);
        doAjax("PATCH", "/api/users/" + activeUser.username + "/", formdata, false, callback);
    };
    
    model.upvoteMessage = function (id, callback){
        doAjax("PATCH", "/api/messages/" + id + "/", {action: "upvote"}, true, callback);
    };
    
    model.downvoteMessage = function (id, callback){
        doAjax("PATCH", "/api/messages/" + id + "/", {action: "downvote"}, true, callback);
    };

    // delete
    
    model.deleteMessage = function (id, callback){
        doAjax("DELETE", "/api/messages/" + id + "/", null, false, callback);
    };
    
    return model;
    
}())

