var model = (function(){
    "use strict";
    
    var model = {};
    
    // Message constructor
    var Message = (function (){
        var id = 0;
        return function Message(message){
            if (message.id){
                this.id = message.id;
                id = (message.id>=id)? message.id+1 : id;
            }else{
                this.id = id++;
            }
            this.content = message.content;
            this.author = message.author;
            this.upvote = (message.upvote)? message.upvote : 0;
            this.downvote = (message.downvote)? message.downvote : 0;
        }
    }());

    // message store
    var messages = [];
    
    // init
    
    model.init = function (){
        // fetch data from the local store
        var data = localStorage.getItem("messages");
        if (data){
            messages = JSON.parse(data).map(function(message){
                return new Message(message);
            });
        }
        // dispatch "messageUpdated"
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
    }
    
    // create
    
    model.createMessage = function (data){
        // create the message
        var message = new Message(data);
        messages.push(message);
        // update the local storage and dispatch "messageUpdated"
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
    };
    
    // update
    
    model.upvoteMessage = function (id){
        // select and upvote message
        var message = messages.find(function(e){
            return (e.id === id);
        });
        message.upvote+=1;
        // update the local storage and dispatch "messageUpdated"
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
    }
    
    model.downvoteMessage = function (id){
        // select and downvote message
        var message = messages.find(function(e){
            return (e.id === id);
        });
        message.downvote+=1;
        // update the local storage and dispatch "messageUpdated"
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
    }

    // delete
    
    model.deleteMessage = function (id){
        // select and delete message
        messages = messages.filter(function(e){
            return (e.id !== id);
        });
        // update the local storage and dispatch "messageUpdated"
        localStorage.setItem("messages", JSON.stringify(messages));
        document.dispatchEvent(new CustomEvent("messageUpdated", {'detail': messages }));
    }
    
    return model;
    
}())

