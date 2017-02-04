var model = (function(){
    "use strict";
    
    var Message = function(username,content){
        this.username = username;
        this.content = content;
    }
    
    var messages = []; 
    
    var model = {};

    // Create
    
    model.createMessage = function(username,content){
        var message = new Message(username,content);
        messages.push(message);
        var event = new CustomEvent('onNewMessage',{detail: message});
        console.log(event);
        document.dispatchEvent(event);
    };
    
    // Read
    
    model.getMessages = function(){
        return messages;
    };
    
    // Update
    
    // Delete
    
    return model;
    
}());