var model = (function(){
    "use strict";
    
    var model = {};
    
    // Message constructor
    var Message = function(message){
            this.id = message.id;
            this.content = message.content;
            this.username = message.username;
            this.upvote = (message.upvote)? message.upvote : 0;
            this.downvote = (message.downvote)? message.downvote : 0;
    };
        
    var User = function(user){
        this.username = user.username;
        this.picture = null;
    };

    // data stores
    var messages;
    var users;
    
    // init

    model.init = function (){
        messages = ("messages" in localStorage)? JSON.parse(localStorage.getItem("messages")) : {};
        document.dispatchEvent(new CustomEvent("messagesUpdated", {'detail': Object.values(messages) }));
        users = ("users" in localStorage)? JSON.parse(localStorage.getItem("users")) : {};
        document.dispatchEvent(new CustomEvent("usersUpdated", {'detail': Object.values(users)}));
    }
    
    // create
    
    model.createUser = function(data){
        var user = new User(data);
        users[user.username] = user;
        // update the local storage and dispatch event
        localStorage.setItem("users", JSON.stringify(users));
        document.dispatchEvent(new CustomEvent("userUpdated", {'detail': user}));
    }
    
    model.createMessage = function (data){
        var id;
        do{
            id = Math.random().toString(36).substring(7);
        }while(id in messages);
        data.id = id;
        // create the message
        var message = new Message(data);
        messages[message.id] = message;
        // update the local storage and dispatch event
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': message}));
    };
    
    // read
    
    model.getMessages = function (){
        document.dispatchEvent(new CustomEvent("messagesUpdated", {'detail': Object.values(messages)}));
    };
    
    model.getUsers = function (){
        document.dispatchEvent(new CustomEvent("usersUpdated", {'detail': Object.values(users)}));
    };
    
    // update
    
    model.updateUser = function (data){
       var user = users[data.username];
       if (data.picture.type.match(/image.*/)) {
    		var reader = new FileReader();
    		reader.onload = function(e) {
                user.picture = reader.result;
                // update the local storage and dispatch event
                localStorage.setItem("users", JSON.stringify(users));
                document.dispatchEvent(new CustomEvent("userUpdated", {'detail': user }));
    		};
    		reader.readAsDataURL(data.picture);	
    	}
    };
    
    model.upvoteMessage = function (id){
        // select and upvote message
        var message = messages[id];
        message.upvote+=1;
        // update the local storage and dispatch event
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': message }));
    };
    
    model.downvoteMessage = function (id){
        // select and downvote message
        var message = messages[id];
        message.downvote+=1;
        // update the local storage and dispatch event
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': message }));
    };

    // delete
    
    model.deleteMessage = function (id){
        // select and delete message
        var message = messages[id];
        delete messages[id];
        // update the local storage and dispatch event
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': message }));
    };
    
    return model;
    
}())

